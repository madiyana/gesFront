import { Component, OnInit } from '@angular/core';
import { Employes } from '../../_models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployesService } from '../../_services/employes.service';
import { AlertService } from 'angular-x-alerts';

@Component({
  selector: 'app-employe-creer',
  templateUrl: './employe-creer.component.html',
  styleUrls: ['./employe-creer.component.css']
})
export class EmployeCreerComponent implements OnInit {

  employe = new Employes();
  nom: string;
  idEmploye: number;
  page: string;
  jour: string;
  mois: string;
  annee: string;
  constructor(
    private employeService: EmployesService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    // Faire mise a jour dans cette page ==> Recupere id
    this.page = localStorage.getItem('pageEmploye');
    this.idEmploye = JSON.parse(localStorage.getItem('idEmploye'));
    if (this.page === 'modif' && this.idEmploye) {
      this.employeService.getById(this.idEmploye).subscribe(
        data => {
          this.employe = data;
        }
      );
    }
  }

  enregistrer() {
    if (Employes.verifyInput(this.employe)) {
      this.employeService.create(this.employe).subscribe(
        data => {
          localStorage.setItem('idEmploye', data.id.toString());
          this.router.navigate(['employes/consult']);
        },
        error => {
          this.alertService.error(error.error);
        });
    }else {
      this.alertService.error('Tous les champs obligatoires ne sont pas remplis.');
    }
  }

  retourListe() {
    this.router.navigate(['employes']);
   }

  vider() {
    this.employe = new Employes();
  }
}
