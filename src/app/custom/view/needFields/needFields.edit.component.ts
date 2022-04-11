import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SelectItem, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { NeedFields } from '../../domain/needFields';
import { NeedFieldsService } from '../../service/needFields.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../service/authguardservice';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../../domain/user';
import { UserService } from '../../service/user.service';

import { Property } from '../../domain/property';

import { PropertyService } from '../../service/property.service';



@Component({
    // tslint:disable-next-line
    selector: 'needFields-edit-component',
    templateUrl: 'needFields.edit.component.html',
    styles: [
        `
            .buttons-grid button {
                margin-bottom: 0.75em;
            }
        `
    ]
})
export class NeedFieldsEditComponent implements OnInit {

    loaded = false;
    id: string;

    object: NeedFields;

    objects: NeedFields[];

    
    
    propertys : Property[];
    

    


    cols: any[];

    items: any[];

    
    formHeader: string;

    showDeleteButton = true;


    newItem: boolean;

    currentUser: User;

    @Output() public emitNewId: EventEmitter<string> = new EventEmitter();
    @Output() public cancel: EventEmitter<string> = new EventEmitter();
    @Input() public loadedFromAnotherComponent = false;
    @Input() public inputId: string;
    @Input() public parentId: number;
    @Input() public categoryHelpId: number;
    

    

    constructor(
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
        private needFieldsService:NeedFieldsService,
        private router: Router,
        private authGuard: AuthGuardService,
        private messageService: MessageService,
        private userService: UserService,
        private propertyService: PropertyService,
        
        
    ) {}

    ngOnInit() {
        this.currentUser = new User();
        this.currentUser.setCurrentUserId();

        if (!this.loadedFromAnotherComponent) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.userService.getById(this.currentUser.id).then(u => {
                this.currentUser = u;
            });
        } else {
            this.id = this.inputId;
        }

        
        
            
	        this.propertyService.getAllById(this.categoryHelpId).then(objects => {
                this.propertys = objects;
                if(this.propertys.length>0) {
                this.object.property=this.propertys[0];
                }
            });
            
        
        
        

        

        
        if (this.id === 'new') {
            this.object = new NeedFields();
            this.loaded = true;
            this.showDeleteButton = false;
            this.formHeader = 'New NeedFields';
            
            
            
            
            
        } else {
            this.formHeader = 'Edit NeedFields';
            this.needFieldsService
                .getById(this.id)
                .then(o => {
                    this.object = o;
                    
                    
                    
                    
                    

                    
                    
	                
                        
                    
                    

                    
	                this.propertyService.getById(o.propertyId.toString()).then(obj => {
                        this.object.property = obj;
                    });
                    
                    

                })
                .then(o => {
                    this.breadcrumbService.setItems([
                        { label: 'NeedFields', routerLink: ['/NeedFields'] },
                        {
                            label: (this.object.id.toString()),
                            routerLink: ['/NeedFields/' + this.id]
                        }

                    ]);
                    this.loaded = true;
                });
        }
    }
    // tslint:disable-next-line
    onFinishRedirect(number, count, id) {
        if (number === count) {
            this.router.navigate(['/NeedFields' + id]);
        }
    }

    fieldsValid() {

        const valid = true;
        // tslint:disable-next-line
        let message;

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
            
            
	        this.object.propertyId = this.object.property.id;
            
            

            
            this.object.NeedId = this.parentId;
            
            if (this.id === 'new') {
                delete this.object.id;
                this.needFieldsService
                .post(this.object)
                    .then(o => {
                        this.id = o.id.toString();
                        this.emitNewId.emit(this.id);
                    })
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            this.router.navigate(['/NeedFields']);
                        }
                    });
            } else {
                this.needFieldsService
                    .put(this.object, this.id)
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            this.router.navigate(['/NeedFields']);
                        }
                        else {
                            this.emitNewId.emit(this.id);
                        }
                    });
            }
        }
    }

    cancelClick($event) {
        if (!this.loadedFromAnotherComponent) {
            this.router.navigate(['/NeedFields']);
        } else {
            this.cancel.emit();
        }
    }

    deleteClick($event) {
        this.needFieldsService.delete(this.id).then((o) => {
            this.router.navigate(['/NeedFields']);
        });
    }


    
    
    
    






}
