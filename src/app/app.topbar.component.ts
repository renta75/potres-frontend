import { Component } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Configuration } from './custom/domain/configuration';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    constructor(public app: AppMainComponent, private router: Router, private jwtHelper: JwtHelperService) {

    }

    onProfil() {
        const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt'));

        this.router.navigate(['/usersrestricted/' + token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']]);

    }

    onLogOut() {
        localStorage.removeItem('jwt');
        this.router.navigate(['/login']);

    }

    getLinkPicture() {
        const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt'));

        return  '/assets/layout/images/avatar.png';
    }

    getName() {
        const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt'));

        return  token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'] + ' '
                 + token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
    }
}
