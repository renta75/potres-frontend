import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HelpFields } from '../domain/HelpFields';
import { MessageService } from 'primeng/api';
import { Configuration } from '../domain/configuration';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class HelpFieldsService {

    uri = Configuration.server + 'HelpFields';

    constructor(private http: HttpClient, private messageService: MessageService, private jwtHelperService: JwtHelperService) {}



    getAllById(HelpId): Promise<HelpFields[]> {
        const promise = this.http.get<HelpFields[]>(`${this.uri}?filter=HelpId(=)` + HelpId)
                          .toPromise();
        return promise;
    }



    getAll(): Promise<HelpFields[]> {
        const promise = this.http.get<HelpFields[]>(`${this.uri}`)
                          .toPromise();
        return promise;
    }
    getById(id): Promise<HelpFields> {
        const promise = this.http.get<HelpFields>(`${this.uri}/${id}`)
                          .toPromise();
        return promise;
    }

    post(obj: HelpFields) {
        const promise = this.http
                           .post<HelpFields>(`${this.uri}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'HelpFields dodana' });
                obj.id = oa.id;
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Spremanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }

    put(obj: HelpFields, id: string) {
        const promise = this.http
                           .put<HelpFields>(`${this.uri}/${id}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'HelpFields ažurirana' });
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
                this.messageService.add({ severity: 'success', summary: 'Brisanje uspješno', detail: 'HelpFields obrisan' });
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Brisanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }
}
