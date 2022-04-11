import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SelectItem, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { Help } from '../../domain/help';
import { HelpService } from '../../service/help.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../service/authguardservice';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../../domain/user';
import { UserService } from '../../service/user.service';

import { HelpCategory } from '../../domain/helpCategory';
import { HelpFields } from '../../domain/helpFields';
import { Status } from '../../domain/status';

import { HelpCategoryService } from '../../service/helpCategory.service';
import { HelpFieldsService } from '../../service/helpFields.service';
import { StatusService } from '../../service/status.service';

@Component({
    // tslint:disable-next-line
    selector: "help-edit-component",
    templateUrl: 'help.edit.component.html',
    styles: [
        `
            .buttons-grid button {
                margin-bottom: 0.75em;
            }
        `,
    ],
})
export class HelpEditComponent implements OnInit {
    loaded = false;
    id: string;

    object: Help;

    objects: Help[];

    categorys: HelpCategory[];

    fields: HelpFields[];
    helpFields: HelpFields;
    displayHelpFields: boolean;
    itemsHelpFields: any[];

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
        private helpService: HelpService,
        private router: Router,
        private authGuard: AuthGuardService,
        private messageService: MessageService,
        private userService: UserService,
        private categoryService: HelpCategoryService,
        private fieldsService: HelpFieldsService,
        private statusService: StatusService
    ) {}

    ngOnInit() {
        this.currentUser = new User();
        this.currentUser.setCurrentUserId();

        if (!this.loadedFromAnotherComponent) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.userService
                .getById(this.currentUser.id)
                .then((u) => {
                    this.currentUser = u;
                })
                .catch((err) => console.log(err));
        } else {
            this.id = this.inputId;
        }

        this.categoryService
            .getAll()
            .then((objects) => {
                this.categorys = objects;
                if (this.categorys.length > 0) {
                    this.object.category = this.categorys[0];
                }
            })
            .catch((err) => console.log(err));

        if (this.id !== 'new') {
            this.fieldsService
                .getAll()
                .then((objects) => {
                    this.fields = objects;
                })
                .catch((err) => console.log(err));
        }
        this.itemsHelpFields = [
            {
                label: 'View',
                icon: 'pi pi-search',
                command: (event) => this.viewHelpFields(this.helpFields),
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: (event) => this.deleteHelpFields(this.helpFields),
            },
            {
                label: 'Add',
                icon: 'ui-icon-add',
                command: (event) => this.addHelpFields(),
            },
        ];

        this.statusService
            .getAll()
            .then((objects) => {
                this.statuss = objects;
                if (this.statuss.length > 0) {
                    this.object.status = this.statuss[0];
                }
            })
            .catch((err) => console.log(err));

        if (this.id === 'new') {
            this.object = new Help();
            this.loaded = true;
            this.showDeleteButton = false;
            this.formHeader = 'New Help';
            this.displayHelpFields = false;
            this.object.createdDateTime = new Date();
            this.object.editedDateTime = new Date();
        } else {
            this.formHeader = 'Edit Help';
            this.helpService
                .getById(this.id)
                .then((o) => {
                    this.object = o;

                    this.object.createdDateTime = new Date(o.createdDateTime);

                    this.object.editedDateTime = new Date(o.editedDateTime);

                    this.categoryService
                        .getById(o.categoryId.toString())
                        .then((obj) => {
                            this.object.category = obj;
                        })
                        .catch((err) => console.log(err));

                    this.fieldsService
                        .getAllById(o.id)
                        .then((obj) => {
                            this.fields = obj;
                        })
                        .catch((err) => console.log(err));

                    this.statusService
                        .getById(o.statusId.toString())
                        .then((obj) => {
                            this.object.status = obj;
                        })
                        .catch((err) => console.log(err));
                })
                .then((o) => {
                    this.breadcrumbService.setItems([
                        { label: 'Pomoći', routerLink: ['/Help'] },
                        {
                            label: this.object.id.toString(),
                            routerLink: ['/Help/' + this.id],
                        },
                    ]);
                    this.loaded = true;
                });
        }
    }
    // tslint:disable-next-line
    onFinishRedirect(number, count, id) {
        if (number === count) {
            this.router.navigate(['/Help' + id]);
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
                detail: message,
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
                this.helpService
                    .post(this.object)
                    .then((o) => {
                        this.id = o.id.toString();
                        this.emitNewId.emit(this.id);
                    })
                    .then((o) => {
                        if (!this.loadedFromAnotherComponent) {
                            if (this.helpFields.HelpId) {
                                this.addHelpFields();
                            } else {
                                this.router.navigate(['/Help']);
                            }
                        }
                    })
                    .catch((err) => console.log(err));
            } else {
                this.helpService
                    .put(this.object, this.id)
                    .then((o) => {
                        if (!this.loadedFromAnotherComponent) {
                            this.router.navigate(['/Help']);
                        } else {
                            this.emitNewId.emit(this.id);
                        }
                    })
                    .catch((err) => console.log(err));
            }
        }
    }

    cancelClick($event) {
        if (!this.loadedFromAnotherComponent) {
            this.router.navigate(['/Help']);
        } else {
            this.cancel.emit();
        }
    }

    deleteClick($event) {
        this.helpService
            .delete(this.id)
            .then((o) => {
                this.router.navigate(['/Help']);
            })
            .catch((err) => console.log(err));
    }

    isHelpFieldsFieldsValid(selected: HelpFields) {
        const valid = true;
        // tslint:disable-next-line
        let message;

        if (!valid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Greška prilikom spremanja!',
                detail: message,
            });
        }

        return valid;
    }

    saveHelpFieldsDetailClick() {
        if (this.isHelpFieldsFieldsValid(this.helpFields)) {
            if (this.newItem) {
                this.displayHelpFields = false;
            } else {
                this.fieldsService.put(this.helpFields, this.id);
            }
        }
    }

    cancelHelpFieldsClick(event: any) {
        this.displayHelpFields = false;
    }

    addHelpFields() {
        this.helpFields = new HelpFields();
        this.displayHelpFields = true;
    }

    viewHelpFields(selected: HelpFields) {
        this.helpFields = selected;
        this.displayHelpFields = true;
    }

    deleteHelpFields(selected: HelpFields) {
        this.fieldsService.delete(selected.id).then(() => this.reloadfields());
    }

    reloadfields() {
        this.fieldsService
            .getAllById(this.object.id)
            .then((obj) => {
                this.fields = obj;
            })
            .catch((err) => console.log(err));
    }

    onHelpFieldsNewId(id: string) {
        this.displayHelpFields = false;
        this.reloadfields();
    }
    getHelpFieldsId() {
        if (this.helpFields.id) {
            return this.helpFields.id;
        } else {
            return 'new';
        }
    }
}
