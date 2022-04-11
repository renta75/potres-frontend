import { Component, OnInit } from '@angular/core';
import { SelectItem, MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../domain/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../service/authguardservice';
import { Configuration } from '../domain/configuration';
import * as $ from 'jquery';
import { MessageService } from 'primeng/api';
import { PasswordCheckService, PasswordCheckStrength } from '../service/password-check.service';

@Component({
    templateUrl: './user-restricted.edit.component.html',
    styles: [
        `
            .buttons-grid button {
                margin-bottom: 0.75em;
            }
        `
    ]
})
export class UserRestrictedEditComponent implements OnInit {
    id: string;

    object = new User();

    timeStamp = new Date().getTime();


    urlPicturePost: string;

    response: any;

    allowUpload = false;

    imageToUpload: any;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private authGuard: AuthGuardService,
        private messageService: MessageService,
        private passwordCheckService: PasswordCheckService
    ) {
        this.id = this.route.snapshot.paramMap.get('id');

        if (this.id === 'new') {
            this.object = new User();
        } else {
            this.userService
                .getById(this.id)
                .then(user => (this.object = user))
                .then(user => {
                    this.breadcrumbService.setItems([
                        { label: 'Users', routerLink: ['/users'] },
                        {
                            label: this.object.username,
                            routerLink: ['/users/' + this.id]
                        }
                    ]);
                });
        }
    }

    ngOnInit() {
        
    }

    saveCloseClick($event) {
        this.userService
            .put(this.object, this.id)
            .then(user => this.router.navigate(['../']));
    }

    fieldsValid() {

        let valid = true;
        let message;

        if (this.id === 'new' && (!this.object.password || this.object.password.length < 1)) {
            valid = false;
            message = 'Zaporka je obavezna';
        }

        if (this.passwordCheckService.checkPasswordStrength(this.object.password) !== PasswordCheckStrength.Strong) {
            valid = false;
            message = 'Zaporka mora biti jaka';
        }

        if (!this.object.lastName || this.object.lastName.length < 1) {
            valid = false;
            message = 'Ime je obavezno';
        }

        if (!this.object.lastName || this.object.lastName.length < 1) {
            valid = false;
            message = 'Prezime je obavezno';
        }

        if (!this.object.username || this.object.username.length < 1) {
            valid = false;
            message = 'Korisničko ime je obavezno';
        }

        if (!valid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Greška prilikom spremanja!',
                detail: message
            });
        }

        return valid;
    }

    saveClick($event) {

        if (this.fieldsValid()) {
            this.userService
                .put(this.object, this.id)
                .then(user => this.router.navigate(['/users/' + user.id]));
        }
    }

    cancelClick($event) {
        this.router.navigate(['../']);
    }

 
}