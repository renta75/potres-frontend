import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { Status } from '../../domain/status';
import { StatusService } from '../../service/status.service';
import { UserService } from '../../service/user.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../service/authguardservice';
import { User } from '../../domain/user';

@Component({
    templateUrl: './status.table.component.html',
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
export class StatusTableComponent implements OnInit {

    loaded = false;

    cols: any[];

    objects: Status[];

    selected: Status;

    sortKey: string;

    sortField: string;

    sortOrder: number;

    timeout: any;

    items: MenuItem[];

    currentUser: User;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private statusService:StatusService,
        private messageService: MessageService,
        private router: Router,
        private userService: UserService) {
        this.breadcrumbService.setItems([
            { label: 'Statuss', routerLink: ['/Status'] }
        ]);
    }

    ngOnInit() {
        this.items = [
            { label: 'Pregledaj', icon: 'pi pi-search', command: (event) => this.view(this.selected) },
            { label: 'Izbriši', icon: 'pi pi-times', command: (event) => this.delete(this.selected) }
        ];

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'name', header: 'Naziv' },
        ];

        this.statusService.getAll().then(o => {
            this.objects = o;
            this.loaded = true;
        });
    }

    view(status: Status) {
        this.router.navigate(['/Status', status.id]);
    }

    delete(status: Status) {

        this.statusService.delete(status.id.toString()).then(l =>
            this.statusService.getAll().then(o => {
                this.objects = o;
            }));
    }

    addClick($event) {
        this.router.navigate(['/Status', 'new']);
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
            this.saveAsExcelFile(excelBuffer, 'statuss');
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
