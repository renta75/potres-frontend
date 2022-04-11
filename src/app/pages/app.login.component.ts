import { Component } from '@angular/core';
import { UserService } from '../custom/service/user.service';
import { Router } from '@angular/router';
import { LoginService } from '../custom/service/login.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',



  styles: [
    `
    @media screen and (min-width: 370px) {
        .login {
            margin-left: calc(50% - 200px) !important;
        }

        @media screen and (min-width: 1024px) {
            .login {
                margin-left: -200px !important;
            }
    `
  ]
  
})
export class AppLoginComponent {
    constructor(private loginService: LoginService,
                private messageService: MessageService,
                private router: Router) {
    }

    korisnik: string;

    zaporka: string;

    loginClick() {
        this.loginService.login(this.korisnik, this.zaporka)
            .subscribe(token => {
                localStorage.setItem( 'jwt', token.token );
                this.router.navigate(['/'] );
            }, error => {
                this.messageService.add({ severity: 'error', summary: 'Prijava neuspješna', detail: error.status + ':' + error.message });
            });
    }

    onKeydown(event: KeyboardEvent) {
        if ( event.key === 'Enter' ) {
            this.loginClick();
        }
    }


}
