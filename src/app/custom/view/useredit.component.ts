import { Component, OnInit } from '@angular/core';
import { SelectItem, MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../domain/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../service/authguardservice';
import { Configuration } from '../domain/configuration';
import * as $ from 'jquery';
import { MessageService } from 'primeng/api';
import { PasswordCheckService, PasswordCheckStrength } from '../service/password-check.service';

@Component({
    templateUrl: './useredit.component.html',
    styles: [
        `
            .buttons-grid button {
                margin-bottom: 0.75em;
            }
        `
    ]
})
export class UserEditComponent implements OnInit {
    id: string;

    object = new User();

    timeStamp = new Date().getTime();

  
    response: any;

    uloge: any[];

    currentUser: User;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private authGuard: AuthGuardService,
        private messageService: MessageService,
        private passwordCheckService: PasswordCheckService
    ) {
    }

    ngOnInit() {
        this.currentUser = new User();
        this.currentUser.setCurrentUserId();
        this.userService.getById(this.currentUser.id).then(u => {
            this.currentUser = u;

            
        });

        this.id = this.route.snapshot.paramMap.get('id');

        this.uloge = [
            { label: 'Administrator', value: 'JeAdmin' }
        ];

        if (this.id === 'new') {
            this.object = new User();
            this.prepareData();
        } else {
            this.userService
                .getById(this.id)
                .then(user => {
                    this.object = user;

                    this.prepareData();

                    this.breadcrumbService.setItems([
                        { label: 'Korisnici', routerLink: ['/users'] },
                        {
                            label: this.object.username,
                            routerLink: ['/user/' + this.id]
                        }
                    ]);
                });

        }

    }

    prepareData() {
        if (this.object.JeAdmin) {
            
        }
    }

    changeRole($event) {

        this.object.Uloga = $event.value;
        // obriši sve role za slučaj da je ostala koja iz starog sistema
        this.object.JeAdmin = false;


        if (this.object.Uloga === 'JeAdmin') {
            
        }
    }

    fieldsValid() {

        let valid = true;
        let message;

        if (this.id === 'new' && (!this.object.password || this.object.password.length < 1)) {
            valid = false;
            message = 'Zaporka je obavezna';
        }

        if (this.passwordCheckService.checkPasswordStrength(this.object.password) !== PasswordCheckStrength.Strong) {
            valid = false;
            message = 'Zaporka mora biti jaka';
        }

        if (!this.object.lastName || this.object.lastName.length < 1) {
            valid = false;
            message = 'Ime je obavezno';
        }

        if (!this.object.firstName || this.object.firstName.length < 1) {
            valid = false;
            message = 'Prezime je obavezno';
        }

        if (!this.object.username || this.object.username.length < 1) {
            valid = false;
            message = 'Korisničko ime je obavezno';
        }

        if (!valid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Greška prilikom spremanja!',
                detail: message
            });
        }

        return valid;
    }

    saveCloseClick($event) {

        if (this.id === 'new') {
            this.userService
                .post(this.object)
                .then(user => this.router.navigate(['/user/']));
        } else {
            this.userService
                .put(this.object, this.id)
                .then(user => this.router.navigate(['/user']));
        }
    }

    saveClick($event) {


        if (this.fieldsValid()) {
            if (this.id === 'new') {
                this.userService
                    .post(this.object)
                    .then(user => {
                        this.id = user.id;
                        this.router.navigate(['/user/' + user.id]);
                    });
            } else {
                this.userService
                    .put(this.object, this.id)
                    .then(user => this.router.navigate(['/user/' + this.id]));
            }
        }
    }

    cancelClick($event) {
        this.router.navigate(['/user']);
    }

    public GetImage(url) {
        const http = new XMLHttpRequest();
        http.open('GET', url, true);
        http.responseType = 'blob';
        const token = localStorage.getItem('jwt');
        http.setRequestHeader('Authorization', 'Bearer ' + token);
        http.onload = this.loadImage;
        http.send();
    }

    public loadImage(e) {
        const urlCreator = window.URL;
        const imageUrl = urlCreator.createObjectURL(this.response);
        $('#photoToUpload').attr('src', imageUrl);
    }

    public ImageExists(url) {
        const http = new XMLHttpRequest();
        http.open('GET', url, false);
        const token = localStorage.getItem('jwt');
        http.setRequestHeader('Authorization', 'Bearer ' + token);
        http.send();
        return http.status !== 404;
    }

    
}
