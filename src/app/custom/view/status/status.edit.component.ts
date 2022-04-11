import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SelectItem, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../../domain/status';
import { StatusService } from '../../service/status.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../service/authguardservice';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../../domain/user';
import { UserService } from '../../service/user.service';





@Component({
    // tslint:disable-next-line
    selector: 'status-edit-component',
    templateUrl: 'status.edit.component.html',
    styles: [
        `
            .buttons-grid button {
                margin-bottom: 0.75em;
            }
        `
    ]
})
export class StatusEditComponent implements OnInit {

    loaded = false;
    id: string;

    object: Status;

    objects: Status[];

    


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
        private statusService:StatusService,
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
            this.object = new Status();
            this.loaded = true;
            this.showDeleteButton = false;
            this.formHeader = 'New Status';
            
            
            
        } else {
            this.formHeader = 'Edit Status';
            this.statusService
                .getById(this.id)
                .then(o => {
                    this.object = o;
                    
                    
                    

                    

                })
                .then(o => {
                    this.breadcrumbService.setItems([
                        { label: 'Status', routerLink: ['/Status'] },
                        {
                            label: (this.object.id.toString()),
                            routerLink: ['/Status/' + this.id]
                        }

                    ]);
                    this.loaded = true;
                });
        }
    }
    // tslint:disable-next-line
    onFinishRedirect(number, count, id) {
        if (number === count) {
            this.router.navigate(['/Status' + id]);
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
                this.statusService
                .post(this.object)
                    .then(o => {
                        this.id = o.id.toString();
                        this.emitNewId.emit(this.id);
                    })
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            this.router.navigate(['/Status']);
                        }
                    });
            } else {
                this.statusService
                    .put(this.object, this.id)
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            this.router.navigate(['/Status']);
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
            this.router.navigate(['/Status']);
        } else {
            this.cancel.emit();
        }
    }

    deleteClick($event) {
        this.statusService.delete(this.id).then((o) => {
            this.router.navigate(['/Status']);
        });
    }


    






}
