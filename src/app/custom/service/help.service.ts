import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Help } from '../domain/Help';
import { MessageService } from 'primeng/api';
import { Configuration } from '../domain/configuration';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class HelpService {

    uri = Configuration.server + 'Help';

    constructor(private http: HttpClient, private messageService: MessageService, private jwtHelperService: JwtHelperService) {}

    
    

    getAll(): Promise<Help[]> {
        const promise = this.http.get<Help[]>(`${this.uri}`)
                          .toPromise();
        return promise;
    }
    getById(id): Promise<Help> {
        const promise = this.http.get<Help>(`${this.uri}/${id}`)
                          .toPromise();
        return promise;
    }

    post(obj: Help) {
        const promise = this.http
                           .post<Help>(`${this.uri}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'Help dodana' });
                obj.id = oa.id;
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Spremanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }

    put(obj: Help, id: string) {
        const promise = this.http
                           .put<Help>(`${this.uri}/${id}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'Help ažurirana' });
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
                this.messageService.add({ severity: 'success', summary: 'Brisanje uspješno', detail: 'Help obrisan' });
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Brisanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }
}
