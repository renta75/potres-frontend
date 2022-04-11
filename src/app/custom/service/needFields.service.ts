import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NeedFields } from '../domain/NeedFields';
import { MessageService } from 'primeng/api';
import { Configuration } from '../domain/configuration';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class NeedFieldsService {

    uri = Configuration.server + 'NeedFields';

    constructor(private http: HttpClient, private messageService: MessageService, private jwtHelperService: JwtHelperService) {}

    
    
    getAllById(NeedId): Promise<NeedFields[]> {
        const promise = this.http.get<NeedFields[]>(`${this.uri}?filter=NeedId(=)`+NeedId)
                          .toPromise();
        return promise;
    }
    
    

    getAll(): Promise<NeedFields[]> {
        const promise = this.http.get<NeedFields[]>(`${this.uri}`)
                          .toPromise();
        return promise;
    }
    getById(id): Promise<NeedFields> {
        const promise = this.http.get<NeedFields>(`${this.uri}/${id}`)
                          .toPromise();
        return promise;
    }

    post(obj: NeedFields) {
        const promise = this.http
                           .post<NeedFields>(`${this.uri}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'NeedFields dodana' });
                obj.id = oa.id;
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Spremanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }

    put(obj: NeedFields, id: string) {
        const promise = this.http
                           .put<NeedFields>(`${this.uri}/${id}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'NeedFields ažurirana' });
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
                this.messageService.add({ severity: 'success', summary: 'Brisanje uspješno', detail: 'NeedFields obrisan' });
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Brisanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }
}
