import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Status } from '../domain/Status';
import { MessageService } from 'primeng/api';
import { Configuration } from '../domain/configuration';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class StatusService {

    uri = Configuration.server + 'Status';

    constructor(private http: HttpClient, private messageService: MessageService, private jwtHelperService: JwtHelperService) {}

    
    

    getAll(): Promise<Status[]> {
        const promise = this.http.get<Status[]>(`${this.uri}`)
                          .toPromise();
        return promise;
    }
    getById(id): Promise<Status> {
        const promise = this.http.get<Status>(`${this.uri}/${id}`)
                          .toPromise();
        return promise;
    }

    post(obj: Status) {
        const promise = this.http
                           .post<Status>(`${this.uri}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'Status dodana' });
                obj.id = oa.id;
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Spremanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }

    put(obj: Status, id: string) {
        const promise = this.http
                           .put<Status>(`${this.uri}/${id}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'Status ažurirana' });
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
                this.messageService.add({ severity: 'success', summary: 'Brisanje uspješno', detail: 'Status obrisan' });
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Brisanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }
}
