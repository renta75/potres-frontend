import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../domain/user';
import { MessageService } from 'primeng/api';
import { Configuration } from '../domain/configuration';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {

    uri = Configuration.server + 'user';

    constructor(private http: HttpClient, private messageService: MessageService, private jwtHelper: JwtHelperService) {}

    get(): Promise<User[]> {
        const promise = this.http.get<User[]>(`${this.uri}`)
                          .toPromise();
        return promise;
    }

    getById(id): Promise<User> {
        const promise = this.http.get<User>(`${this.uri}/${id}`)
                          .toPromise();
        return promise;
    }

    post(obj: User) {
        const promise =  this.http
                           .post<User>(`${this.uri}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'Korisnik dodan' });
                obj.id = oa.id;
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Spremanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }

    put(obj: User, id: string) {
        const promise =  this.http
                           .put<User>(`${this.uri}/${id}`, obj)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Spremanje uspješno', detail: 'Korisnik ažuriran' });
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Spremanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }

    delete(id: string) {
        const promise =  this.http
                           .delete(`${this.uri}/${id}`)
                           .toPromise();
        promise.then( oa => {
                this.messageService.add({ severity: 'success', summary: 'Brisanje uspješno', detail: 'Korisnik obrisan' });
        })
        .catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Brisanje neuspješno', detail: error.status + ':' + error.message });
        });
        return promise;
    }
}
