import { Component, OnInit } from '@angular/core';
import { UniteMesure } from '../../_models/uniteMesure';
import { UnitemesureService } from '../../_services/unitemesure.service';
import { AlertService } from 'angular-x-alerts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unitemesure-creer',
  templateUrl: './unitemesure-creer.component.html',
  styleUrls: ['./unitemesure-creer.component.css']
})
export class UnitemesureCreerComponent implements OnInit {

  uniteMesure = new UniteMesure();
  nom: string;
  idUniteMesure: number;
  page: string;

  constructor(
    private uniteMesureService: UnitemesureService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.idUniteMesure = JSON.parse(localStorage.getItem('idUniteMesure'));
    // Faire mise a jour dans cette page ==> Recupere id
    this.page = localStorage.getItem('pageUnite');

    if (this.page === 'modif' && this.idUniteMesure) {
      this.uniteMesureService.getById(this.idUniteMesure).subscribe(
        data => {
          this.uniteMesure = data;
        }
      );
    }
  }

  enregistrer() {
    if (UniteMesure.verifyInput(this.uniteMesure)) {
      this.uniteMesureService.create(this.uniteMesure).subscribe(
        data => {
          this.alertService.success('Unité de mesure enregistré avec succés !');
          localStorage.setItem('idUniteMesure', data.id.toString());
          this.router.navigate(['uniteMesure/consult']);
        },
        error => {
          this.alertService.error('Erreur technique lors de l\'enregistrement');
        });
    } else {
      this.alertService.error('Les champs obligatoires ne sont pas remplis !');
    }
  }

  retourListe() {
    this.router.navigate(['uniteMesure']);
  }

  vider() {
    this.uniteMesure = new UniteMesure();
  }

}
