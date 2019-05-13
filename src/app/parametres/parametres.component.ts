import { Component, OnInit } from '@angular/core';
import { Parametres } from '../_models/parametres';
import { ParametreService } from '../_services/parametre.service';
import { AlertService } from 'angular-x-alerts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  nom: string;
  idParametre: number;
  page: string;
  parametres = new Parametres();

  constructor(
    private parametresService: ParametreService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.parametresService.getAll().subscribe(data => {
      this.parametres = data[0];
      console.log(this.parametres);

    });
  }

  enregistrer() {
    if (Parametres.verifyInput(this.parametres)) {
      this.parametresService.create(this.parametres).subscribe(
        data => {
          this.alertService.success('Parametre enregistré avec succés !');
        },
        error => {
          this.alertService.error('Erreur technique lors de l\'enregistrement');
        }
      );
    } else {
      this.alertService.error('Les champs obligatoires ne sont pas remplis !');
    }
  }
}
