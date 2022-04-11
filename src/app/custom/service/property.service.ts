import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Property } from '../domain/Property';
import { MessageService } from 'primeng/api';
import { Configuration } from '../domain/configuration';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class PropertyService {

    uri = Configuration.server + 'Property';

    constructor(private http: HttpClient, private messageService: MessageService, private jwtHelperService: JwtHelperService) {}

    
    
    getAllById(HelpCategoryId): Promise<Property[]> {
        const promise = this.http.get<Property[]>(`${this.uri}?filter=HelpCategoryId(=)`+HelpCategoryId)
                          .toPromise();
        return promise;
    }
    
    

    getAll(): Promise<Property[]> {
        const promise = this.http.get<Property[]>(`${this.uri}`)
                          .toPromise();
        return promise;
    }
    getById(id): Promise<Property> {
        const promise = this.http.get<Property>(`${this.uri}/${id}`)
                          .toPromise();
        return promise;
    }

    post(obj: Property) {
        const promise = this.http
                           .post<Property>(`${this.uri}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'Property dodana' });
                obj.id = oa.id;
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Spremanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }

    put(obj: Property, id: string) {
        const promise = this.http
                           .put<Property>(`${this.uri}/${id}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'Property ažurirana' });
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
                this.messageService.add({ severity: 'success', summary: 'Brisanje uspješno', detail: 'Property obrisan' });
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Brisanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }
}
