import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/index';
import { AlertService } from 'angular-x-alerts';
import { Toubasoft } from '../_enums/toubasoft.enum';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    returnUrlMotPasse: string;
    nameUser: string;
    firstName: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
    //    this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'articles';
    }

    login() {
        this.loading = true;
        let token = null;
        let employes = null;

        this.authenticationService.login(this.model)
            .subscribe(
              data => {

                  // tslint:disable-next-line:forin
                  for (const key in data) {
                    employes = data[key];
                    token = key;
                  }
                if (token !== null && employes !== null) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('currentUser', JSON.stringify(employes));
                    localStorage.setItem('isAuthenticated', 'OK');
                     if (employes.premConnexion === true) {
                        this.authenticationService.logout(this.model);
                        this.router.navigate(['/majMotPasse']);
                    } else {
                      // Redirection selon le profil
                      this.authenticationService.nom = employes.nom;
                      this.authenticationService.prenom = employes.prenom;
                      this.authenticationService.id = employes.id;
                      switch (employes.profil) {
                        case Toubasoft.PROFIL_ADMIN:
                          this.router.navigate(['/articles']);
                          break;
                        case Toubasoft.PROFIL_SUP:
                        this.router.navigate(['/ventes']);
                          break;
                        case Toubasoft.PROFIL_VENDEUR:
                        this.router.navigate(['/ventes']);
                          break;
                        default:
                          break;
                      }
                    }
                }

                },
                error => {
                    this.alertService.error(error.error);
                    this.loading = false;
        });
    }
}
