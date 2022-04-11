import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Need } from '../domain/Need';
import { MessageService } from 'primeng/api';
import { Configuration } from '../domain/configuration';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class NeedService {

    uri = Configuration.server + 'Need';

    constructor(private http: HttpClient, private messageService: MessageService, private jwtHelperService: JwtHelperService) {}

    getAll(): Promise<Need[]> {
        const promise = this.http.get<Need[]>(`${this.uri}`)
                          .toPromise();
        return promise;
    }
    getById(id): Promise<Need> {
        const promise = this.http.get<Need>(`${this.uri}/${id}`)
                          .toPromise();
        return promise;
    }

    post(obj: Need) {
        const promise = this.http
                           .post<Need>(`${this.uri}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'Need dodana' });
                obj.id = oa.id;
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Spremanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }

    put(obj: Need, id: string) {
        const promise = this.http
                           .put<Need>(`${this.uri}/${id}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'Need ažurirana' });
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
                this.messageService.add({ severity: 'success', summary: 'Brisanje uspješno', detail: 'Need obrisan' });
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Brisanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }
}
