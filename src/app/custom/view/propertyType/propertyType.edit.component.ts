import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SelectItem, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { PropertyType } from '../../domain/propertyType';
import { PropertyTypeService } from '../../service/propertyType.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../service/authguardservice';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../../domain/user';
import { UserService } from '../../service/user.service';





@Component({
    // tslint:disable-next-line
    selector: 'propertyType-edit-component',
    templateUrl: 'propertyType.edit.component.html',
    styles: [
        `
            .buttons-grid button {
                margin-bottom: 0.75em;
            }
        `
    ]
})
export class PropertyTypeEditComponent implements OnInit {

    loaded = false;
    id: string;

    object: PropertyType;

    objects: PropertyType[];

    


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
        private propertyTypeService:PropertyTypeService,
        private router: Router,
        private authGuard: AuthGuardService,
        private messageService: MessageService,
        private userService: UserService,
        
        
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

        

        

        
        if (this.id === 'new') {
            this.object = new PropertyType();
            this.loaded = true;
            this.showDeleteButton = false;
            this.formHeader = 'New PropertyType';
            
            
            
            
            
        } else {
            this.formHeader = 'Edit PropertyType';
            this.propertyTypeService
                .getById(this.id)
                .then(o => {
                    this.object = o;
                    
                    
                    
                    
                    

                    

                })
                .then(o => {
                    this.breadcrumbService.setItems([
                        { label: 'PropertyType', routerLink: ['/PropertyType'] },
                        {
                            label: (this.object.id.toString()),
                            routerLink: ['/PropertyType/' + this.id]
                        }

                    ]);
                    this.loaded = true;
                });
        }
    }
    // tslint:disable-next-line
    onFinishRedirect(number, count, id) {
        if (number === count) {
            this.router.navigate(['/PropertyType' + id]);
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
                this.propertyTypeService
                .post(this.object)
                    .then(o => {
                        this.id = o.id.toString();
                        this.emitNewId.emit(this.id);
                    })
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            this.router.navigate(['/PropertyType']);
                        }
                    });
            } else {
                this.propertyTypeService
                    .put(this.object, this.id)
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            this.router.navigate(['/PropertyType']);
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
            this.router.navigate(['/PropertyType']);
        } else {
            this.cancel.emit();
        }
    }

    deleteClick($event) {
        this.propertyTypeService.delete(this.id).then((o) => {
            this.router.navigate(['/PropertyType']);
        });
    }


    






}
