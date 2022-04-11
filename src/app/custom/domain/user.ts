import { UserService } from '../service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppModule } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

export class User {
    id;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    JeAdmin: boolean; // Administrator
    Uloga: string;
    Picture;

    public setCurrentUserId() {
        const jwtHelperService = new JwtHelperService();
        const decodedToken = jwtHelperService.decodeToken(localStorage.getItem('jwt'));
        this.id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
    }
}
