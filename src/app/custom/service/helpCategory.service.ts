import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HelpCategory } from '../domain/HelpCategory';
import { MessageService } from 'primeng/api';
import { Configuration } from '../domain/configuration';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class HelpCategoryService {

    uri = Configuration.server + 'HelpCategory';

    constructor(private http: HttpClient, private messageService: MessageService, private jwtHelperService: JwtHelperService) {}

    
    

    getAll(): Promise<HelpCategory[]> {
        const promise = this.http.get<HelpCategory[]>(`${this.uri}`)
                          .toPromise();
        return promise;
    }
    getById(id): Promise<HelpCategory> {
        const promise = this.http.get<HelpCategory>(`${this.uri}/${id}`)
                          .toPromise();
        return promise;
    }

    post(obj: HelpCategory) {
        const promise = this.http
                           .post<HelpCategory>(`${this.uri}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'HelpCategory dodana' });
                obj.id = oa.id;
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Spremanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }

    put(obj: HelpCategory, id: string) {
        const promise = this.http
                           .put<HelpCategory>(`${this.uri}/${id}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'HelpCategory ažurirana' });
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Spremanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }

    delete(id: any) {
        const promise = this.http
                           .delete(`${this.uri}/${id}`)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Brisanje uspješno', detail: 'HelpCategory obrisan' });
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Brisanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }
}
