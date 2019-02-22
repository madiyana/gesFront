import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../_services/index';
import { Employes } from '../../_models/index';
import { EmployesService } from '../../_services/employes.service';
import { AlertService } from 'angular-x-alerts';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'majMotPasse.component.html'
})

export class MajMotPasseComponent implements OnInit {
    model: any = {};
    password1: string;
    password: string;
    returnUrl: string;
    employes = new Employes();
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private employeService: EmployesService,
        private alertService: AlertService) { }

    ngOnInit() {
       this.employes = this.authenticationService.infoUser();
        console.log(this.employes);
    }

    updatePassword() {       
       if(this.model.password === this.model.password1) {
            this.employes.motDePasse = this.model.password;
            this.employeService.updatePassword(this.employes)
                .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error.error);
                });
            }else {
                this.alertService.error("Les mots de passe doivent etre identiques");
            }
    }
}
