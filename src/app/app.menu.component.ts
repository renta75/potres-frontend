import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMainComponent } from './app.main.component';
import { User } from './custom/domain/user';
import { UserService } from './custom/service/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    @Input() reset: boolean;

    model: any[];

    currentUser: User;

    constructor(public app: AppMainComponent, private userService: UserService) {
        // this.currentUser = new User();
        // this.currentUser.setCurrentUserId();
        // this.userService.getById(this.currentUser.id).then(u => {
        //     this.currentUser = u;

            this.model = [
               
               { label: 'Karta', icon: 'map', routerLink: ['/Map'] },
               
	           { label: 'Kategorije', icon: 'people_outlined', routerLink: ['/HelpCategory'] },
	                        
	           { label: 'Pomoći', icon: 'people_outlined', routerLink: ['/Help'] },
	        
               { label: 'Potrebe', icon: 'people_outlined', routerLink: ['/Need'] },
                                   
                
               { label: 'Users', icon: 'people', routerLink: ['/user'] }
            ];

        // });
    }

    ngOnInit() {
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active': isActive(i)}" [class]="child.badgeStyleClass">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink"
                   [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                   (mouseenter)="onMouseEnter(i)" class="ripplelink">
                    <i class="material-icons">{{child.icon}}</i>
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="material-icons layout-submenu-toggler" *ngIf="child.items">keyboard_arrow_down</i>
                    <span class="menuitem-badge" *ngIf="child.badge"></span>
                </a>

                <a (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
                   [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                   (mouseenter)="onMouseEnter(i)" class="ripplelink">
                    <i class="material-icons">{{child.icon}}</i>
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="material-icons layout-submenu-toggler" *ngIf="child.items">>keyboard_arrow_down</i>
                    <span class="menuitem-badge" *ngIf="child.badge"></span>
                </a>
                <span class="layout-megamenu-submenu-text" *ngIf="!root && mega">
                    
                </span>
                <div class="layout-submenu-container" *ngIf="child.items"
                     [ngClass]="{'layout-submenu-megamenu-container':child.mega}" [ngStyle]="{'padding':isActive(i) ? '':'0'}"
                     [@children]="(app.horizontal && !app.isMobile() && root) ? isActive(i) ? 'visible' : 'hidden' :
                     !root && mega ? 'visible' :
                     isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'">
                    <ul app-submenu [item]="child" class="layout-submenu"
                        [ngClass]="{'layout-megamenu':child.mega}" [mega]="child.mega"
                        [parentActive]="isActive(i)"></ul>
                </div>
            </li>
        </ng-template>
    `,
    styles: ['.active {background: #ec6a00;}']
    ,
    animations: [
        trigger('children', [
            state('void', style({
                height: '0px',
            })),
            state('hiddenAnimated', style({
                height: '0px',
            })),
            state('visibleAnimated', style({
                height: '*',
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('void => visibleAnimated, visibleAnimated => void',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    @Input() mega: boolean;

    _reset: boolean;

    _parentActive: boolean;

    activeIndex: number;

    constructor(public app: AppMainComponent, public router: Router, public location: Location, public appMenu: AppMenuComponent) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
            event.preventDefault();
        }

        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        if (item.routerLink || item.items || item.command || item.url) {
            this.activeIndex = (this.activeIndex as number === index) ? -1 : index;
        }

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (!this.app.horizontal) {
                this.app.menuActive = false;
            }

            if (this.app.horizontal) {
                this.app.resetMenu = true;
            } else {
                this.app.resetMenu = false;
            }

            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (this.root && this.app.menuHoverActive && this.app.horizontal
            && !this.app.isMobile() && !this.app.isTablet()) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && this.app.horizontal) {
            this.activeIndex = null;
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
