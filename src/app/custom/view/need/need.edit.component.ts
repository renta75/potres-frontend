import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SelectItem, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { Need } from '../../domain/need';
import { NeedService } from '../../service/need.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../service/authguardservice';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../../domain/user';
import { UserService } from '../../service/user.service';
import { HelpCategory } from '../../domain/helpCategory';
import { NeedFields } from '../../domain/needFields';
import { Status } from '../../domain/status';
import { HelpCategoryService } from '../../service/helpCategory.service';
import { NeedFieldsService } from '../../service/needFields.service';
import { StatusService } from '../../service/status.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
    // tslint:disable-next-line
    selector: 'need-edit-component',
    templateUrl: 'need.edit.component.html',
    styles: [
        `
            .buttons-grid button {
                margin-bottom: 0.75em;
            }
        `
    ]
})
export class NeedEditComponent implements OnInit {

    loaded = false;
    id: string;
    object: Need;
    objects: Need[];
    categorys: HelpCategory[];
    fields: NeedFields[];
    needFields: NeedFields;
    displayNeedFields: boolean;
    itemsNeedFields: any[];
    statuss: Status[];
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
        private needService: NeedService,
        private router: Router,
        private authGuard: AuthGuardService,
        private messageService: MessageService,
        private userService: UserService,
        private categoryService: HelpCategoryService,
        private fieldsService: NeedFieldsService,
        private statusService: StatusService
    ) { }

    ngOnInit() {
        this.currentUser = new User();
        this.currentUser.setCurrentUserId();

        if (!this.loadedFromAnotherComponent) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.userService.getById(this.currentUser.id).then(u => {
                this.currentUser = u;
            }).catch(err => console.log(err));
        } else {
            this.id = this.inputId;
        }
        this.categoryService.getAll().then(objects => {
            this.categorys = objects;
            if (this.categorys.length > 0) {
                this.object.category = this.categorys[0];
            }
        }).catch(err => console.log(err));
        if (this.id !== 'new') {
            this.fieldsService.getAll().then(objects => {
                this.fields = objects;
        }).catch(err => console.log(err));
        }
        this.itemsNeedFields = [
            {
                label: 'View',
                icon: 'pi pi-search',
                command: event => this.viewNeedFields(this.needFields)
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: event => this.deleteNeedFields(this.needFields)
            },
            {
                label: 'Add',
                icon: 'ui-icon-add',
                command: event => this.addNeedFields()
            }
        ];

        this.statusService.getAll().then(objects => {
            this.statuss = objects;
            if (this.statuss.length > 0) {
                this.object.status = this.statuss[0];
            }
        }).catch(err => console.log(err));

        if (this.id === 'new') {
            this.object = new Need();
            this.loaded = true;
            this.showDeleteButton = false;
            this.formHeader = 'New Need';
            this.object.createdDateTime = new Date();
            this.object.editedDateTime = new Date();
        } else {
            this.formHeader = 'Edit Need';
            this.needService
                .getById(this.id)
                .then(o => {
                    this.object = o;
                    this.object.createdDateTime = new Date(o.createdDateTime);
                    this.object.editedDateTime = new Date(o.editedDateTime);
                    this.categoryService.getById(o.categoryId.toString()).then(obj => {
                        this.object.category = obj;
                    }).catch(err => console.log(err));
                    this.fieldsService.getAllById(o.id).then(obj => {
                        this.fields = obj;
                    }).catch(err => console.log(err));
                    this.statusService.getById(o.statusId.toString()).then(obj => {
                        this.object.status = obj;
                    }).catch(err => console.log(err));
                })
                .then(o => {
                    this.breadcrumbService.setItems([
                        { label: 'Potrebe', routerLink: ['/Need'] },
                        {
                            label: (this.object.id.toString()),
                            routerLink: ['/Need/' + this.id]
                        }

                    ]);
                    this.loaded = true;
                }).catch(err => console.log(err));
        }
    }
    // tslint:disable-next-line
    onFinishRedirect(number, count, id) {
        if (number === count) {
            this.router.navigate(['/Need' + id]);
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
            this.object.categoryId = this.object.category.id;
            this.object.statusId = this.object.status.id;

            if (this.id === 'new') {
                delete this.object.id;
                this.needService
                    .post(this.object)
                    .then(o => {
                        this.id = o.id.toString();
                        this.emitNewId.emit(this.id);
                    })
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            if (this.needFields.NeedId) {
                                this.addNeedFields();
                            } else {
                                this.router.navigate(['/Need']);
                            }
                        }
                    }).catch(err => console.log(err));
            } else {
                this.needService
                    .put(this.object, this.id)
                    .then(o => {
                        if (!this.loadedFromAnotherComponent) {
                            this.router.navigate(['/Need']);
                        } else {
                            this.emitNewId.emit(this.id);
                        }
                    }).catch(err => console.log(err));
            }
        }
    }

    cancelClick($event) {
        if (!this.loadedFromAnotherComponent) {
            this.router.navigate(['/Need']);
        } else {
            this.cancel.emit();
        }
    }

    deleteClick($event) {
        this.needService.delete(this.id).then((o) => {
            this.router.navigate(['/Need']);
        }).catch(err => console.log(err));
    }

    isNeedFieldsFieldsValid(selected: NeedFields) {

        const valid = true;
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

    saveNeedFieldsDetailClick() {
        if (this.isNeedFieldsFieldsValid(this.needFields)) {


            if (this.newItem) {
                this.displayNeedFields = false;
            } else {
                this.fieldsService
                    .put(this.needFields, this.id);
            }
        }
    }

    cancelNeedFieldsClick(event: any) {
        this.displayNeedFields = false;
    }

    addNeedFields() {
        this.needFields = new NeedFields();
        this.displayNeedFields = true;
    }

    viewNeedFields(selected: NeedFields) {
        this.needFields = selected;
        this.displayNeedFields = true;

    }

    deleteNeedFields(selected: NeedFields) {
        this.fieldsService
            .delete(selected.id)
            .then(() => this.reloadfields());
    }

    reloadfields() {
        this.fieldsService.getAllById(this.object.id).then(obj => {
            this.fields = obj;
        }).catch(err => console.log(err));
    }

    onNeedFieldsNewId(id: string) {
        this.displayNeedFields = false;
        this.reloadfields();

    }
    getNeedFieldsId() {
        if (this.needFields.id) {
            return this.needFields.id;
        } else {
            return 'new';
        }
    }
}
