import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SelectItem, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { HelpCategory } from '../../domain/helpCategory';
import { HelpCategoryService } from '../../service/helpCategory.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../service/authguardservice';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../../domain/user';
import { UserService } from '../../service/user.service';

import { Property } from '../../domain/property';

import { PropertyService } from '../../service/property.service';



@Component({
    // tslint:disable-next-line
    selector: 'helpCategory-edit-component',
    templateUrl: 'helpCategory.edit.component.html',
    styles: [
        `
            .buttons-grid button {
                margin-bottom: 0.75em;
            }
        `
    ]
})
export class HelpCategoryEditComponent implements OnInit {

    loaded = false;
    id: string;

    object: HelpCategory;

    objects: HelpCategory[];

    
    
    properties : Property[];
    property : Property;
    displayProperty: boolean;
    itemsProperty : any[];
    

    


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
        private helpCategoryService:HelpCategoryService,
        private router: Router,
        private authGuard: AuthGuardService,
        private messageService: MessageService,
        private userService: UserService,
        private propertiesService: PropertyService,
        
        
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

            this.itemsProperty = [
                    {
                        label: 'View',
                        icon: 'pi pi-search',
                        command: event => this.viewProperty(this.property)
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times',
                        command: event => this.deleteProperty(this.property)
                    },
                    {
                        label: 'Add',
                        icon: 'ui-icon-add',
                        command: event => this.addProperty()
                    }
                ];
            
        
        
        

        

        
        if (this.id === 'new') {
            this.object = new HelpCategory();
            this.loaded = true;
            this.showDeleteButton = false;
            this.formHeader = 'New HelpCategory';
            
            
            
            
            
        } else {
            this.formHeader = 'Edit HelpCategory';
            this.helpCategoryService
                .getById(this.id)
                .then(o => {
                    this.object = o;
                    
                    
                    
                    
                    

                    
                    
	                
                        
                    
                    

                    
                    this.propertiesService.getAllById(o.id).then(obj => {
                        this.properties = obj;
                    });
                    
                    

                })
                .then(o => {
                    this.breadcrumbService.setItems([
                        { label: 'Kategorije pomoći', routerLink: ['/HelpCategory'] },
                        {
                            label: (this.object.id.toString()),
                            routerLink: ['/HelpCategory/' + this.id]
                        }

                    ]);
                    this.loaded = true;
                });
        }
    }
    // tslint:disable-next-line
    onFinishRedirect(number, count, id) {
        if (number === count) {
            this.router.navigate(['/HelpCategory' + id]);
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
            
            
            
            
            

            
            if (this.id === 'new') {
                delete this.object.id;
                this.helpCategoryService
                .post(this.object)
                    .then(o => {
                        this.id = o.id.toString();
                        this.emitNewId.emit(this.id);
                    })
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            if (this.property.propertyTypeId) {
                                this.addProperty();
                            } else {
                                this.router.navigate(['/HelpCategory']);
                            }
                        }
                    });
            } else {
                this.helpCategoryService
                    .put(this.object, this.id)
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            this.router.navigate(['/HelpCategory']);
                        } else {
                            this.emitNewId.emit(this.id);
                        }
                    });
            }
        }
    }

    cancelClick($event) {
        if (!this.loadedFromAnotherComponent) {
            this.router.navigate(['/HelpCategory']);
        } else {
            this.cancel.emit();
        }
    }

    deleteClick($event) {
        this.helpCategoryService.delete(this.id).then((o) => {
            this.router.navigate(['/HelpCategory']);
        });
    }


    
    
	isPropertyFieldsValid(selected: Property) {

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

    savePropertyDetailClick() {
        if (this.isPropertyFieldsValid(this.property)) {


            if (this.newItem) {
                this.displayProperty = false;
            } else {
                this.propertiesService
                    .put(this.property, this.id);
            }
        }
    }

    cancelPropertyClick(event: any) {
        this.displayProperty = false;
    }


    addProperty() {
        this.property = new Property();
        this.displayProperty = true;
    }

    viewProperty(selected: Property) {
        this.property = selected;
        this.displayProperty = true;
   
    }

    deleteProperty(selected: Property) {
        this.propertiesService
                .delete(selected.id)
                .then(() => this.reloadproperties());
    }

     reloadproperties() {
        this.propertiesService.getAllById(this.object.id).then(obj => {
                        this.properties = obj;
        });
    }

    onPropertyNewId(id: string) {
        this.displayProperty = false;
        this.reloadproperties();
        
    }
     getPropertyId() {
        if(this.property.id) {
            return this.property.id;
        } 
        else {
            return 'new';
        }
    }
    
    






}
