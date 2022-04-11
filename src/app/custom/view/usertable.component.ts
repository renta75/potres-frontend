import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BreadcrumbService} from '../../breadcrumb.service';
import {User} from '../domain/user';
import {UserService} from '../service/user.service';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {AuthGuardService} from '../service/authguardservice';

@Component({
    templateUrl: './usertable.component.html',
    styles: [`
        .ui-dataview-layout-options .ui-button {
            margin-left: .5em;
        }
        .ui-dataview .filter-container {
            text-align: center;
        }

        .title-container {
            padding: 1em;
            text-align: right;
        }

        .sort-container {
            text-align: left;
        }

        @keyframes pulse {
            0% {
                background-color: rgba(165, 165, 165, 0.1)
            }
            50% {
                background-color: rgba(165, 165, 165, 0.3)
            }
            100% {
                background-color: rgba(165, 165, 165, 0.1)
            }
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class UserTableComponent implements OnInit {

    cols: any[];

    users: User[];

    selectedUser: User;

    sortKey: string;

    sortField: string;

    sortOrder: number;

    timeout: any;

    items: MenuItem[];

    currentUser: User;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private messageService: MessageService,
        private router: Router ,
        private authGuard: AuthGuardService,
        private userService: UserService) {
        this.breadcrumbService.setItems([
            {label: 'Korisnici', routerLink: ['/user']}
        ]);
    }

    ngOnInit() {
        this.currentUser = new User();
        this.currentUser.setCurrentUserId();
        this.userService.getById(this.currentUser.id).then(u => {
            this.currentUser = u;

            
        });

        this.cols = [
          { field: 'id', header: 'Id' },
          { field: 'username', header: 'Korisničko ime' },
          { field: 'firstName', header: 'Ime' },
          { field: 'lastName', header: 'Prezime' }
        ];

        this.userService.get().then(users => {
            this.users = users;
            this.users.forEach(u => {
                
            });
        });

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewUser(this.selectedUser) },
            { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteUser(this.selectedUser) }
        ];

    }
    // tslint:disable-next-line
    viewUser(User: User) {
        this.router.navigate(['/user', User.id]);
    }
    // tslint:disable-next-line
    deleteUser(User: User) {

        this.userService.delete(User.id).then(l =>
            this.userService.get().then(users => this.users = users) );

        this.messageService.add({ severity: 'info', summary: 'User deleted', detail: User.id + ' - ' + User.username });

    }

    addClick($event) {
        this.router.navigate(['/user', 'new' ]);

    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    exportExcel(tableData) {
        import('xlsx').then(xlsx => {

            let worksheet;

            if (tableData.filteredValue) {
                worksheet = xlsx.utils.json_to_sheet(tableData.filteredValue);
            } else {
                worksheet = xlsx.utils.json_to_sheet(tableData.value);
            }

            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'korisnici');
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import('file-saver').then(FileSaver => {
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }
}
