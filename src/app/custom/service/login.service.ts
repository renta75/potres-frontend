import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../domain/configuration';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = Configuration.server + 'auth/create_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // const model = { "username" : username, "password" : password};
    return this.http.post(`${this.uri}`, {username, password} );
  }


}
