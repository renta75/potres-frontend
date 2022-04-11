import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SelectItem, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../../domain/property';
import { PropertyService } from '../../service/property.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../service/authguardservice';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../../domain/user';
import { UserService } from '../../service/user.service';

import { PropertyType } from '../../domain/propertyType';

import { PropertyTypeService } from '../../service/propertyType.service';



@Component({
    // tslint:disable-next-line
    selector: 'property-edit-component',
    templateUrl: 'property.edit.component.html',
    styles: [
        `
            .buttons-grid button {
                margin-bottom: 0.75em;
            }
        `
    ]
})
export class PropertyEditComponent implements OnInit {

    loaded = false;
    id: string;

    object: Property;

    objects: Property[];

    
    
    propertyTypes : PropertyType[];
    

    


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

    

    constructor(
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
        private propertyService:PropertyService,
        private router: Router,
        private authGuard: AuthGuardService,
        private messageService: MessageService,
        private userService: UserService,
        private propertyTypeService: PropertyTypeService,
        
        
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

        
        
            
	        this.propertyTypeService.getAll().then(objects => {
                this.propertyTypes = objects;
                if(this.propertyTypes.length>0) {
                this.object.propertyType=this.propertyTypes[0];
                }
            });
            
        
        
        

        

        
        if (this.id === 'new') {
            this.object = new Property();
            this.loaded = true;
            this.showDeleteButton = false;
            this.formHeader = 'New Property';
            
            
            
            
            
        } else {
            this.formHeader = 'Edit Property';
            this.propertyService
                .getById(this.id)
                .then(o => {
                    this.object = o;
                    
                    
                    
                    
                    

                    
                    
	                
                        
                    
                    

                    
	                this.propertyTypeService.getById(o.propertyTypeId.toString()).then(obj => {
                        this.object.propertyType = obj;
                    });
                    
                    

                })
                .then(o => {
                    this.breadcrumbService.setItems([
                        { label: 'Property', routerLink: ['/Property'] },
                        {
                            label: (this.object.id.toString()),
                            routerLink: ['/Property/' + this.id]
                        }

                    ]);
                    this.loaded = true;
                });
        }
    }
    // tslint:disable-next-line
    onFinishRedirect(number, count, id) {
        if (number === count) {
            this.router.navigate(['/Property' + id]);
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
            
            
	        this.object.propertyTypeId = this.object.propertyType.id;
            
            

            
            this.object.HelpCategoryId = this.parentId;
            
            if (this.id === 'new') {
                delete this.object.id;
                this.propertyService
                .post(this.object)
                    .then(o => {
                        this.id = o.id.toString();
                        this.emitNewId.emit(this.id);
                    })
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            this.router.navigate(['/Property']);
                        }
                    });
            } else {
                this.propertyService
                    .put(this.object, this.id)
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            this.router.navigate(['/Property']);
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
            this.router.navigate(['/Property']);
        } else {
            this.cancel.emit();
        }
    }

    deleteClick($event) {
        this.propertyService.delete(this.id).then((o) => {
            this.router.navigate(['/Property']);
        });
    }


    
    
    
    






}
