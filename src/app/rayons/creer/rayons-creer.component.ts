import { Component, OnInit } from '@angular/core';
import { Employes, Rayon } from '../../_models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { RayonService } from '../../_services/rayons.service';
import { AlertService } from 'angular-x-alerts';


@Component({
  selector: 'app-rayons-creer',
  templateUrl: './rayons-creer.component.html',
  styleUrls: ['./rayons-creer.component.css']
})
export class RayonsCreerComponent implements OnInit {

  rayon = new Rayon();
  nom: string;
  idRayon: number;
  page: string;

  constructor(
    private rayonService: RayonService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.idRayon = JSON.parse(localStorage.getItem('idRayon'));
    // Faire mise a jour dans cette page ==> Recupere id
    this.page = localStorage.getItem('pageRayon');

    if (this.page === 'modif' && this.idRayon) {
      this.rayonService.getById(this.idRayon).subscribe(
        data => {
          this.rayon = data;
        }
      );
    }
  }

  enregistrer() {
    if (Rayon.verifyInput(this.rayon)) {
      this.rayonService.create(this.rayon).subscribe(
        data => {
          this.alertService.success('Rayon enregistré avec succés !');
          localStorage.setItem('idRayon', data.id.toString());
          this.router.navigate(['rayons/consult']);
        },
        error => {
          this.alertService.error(error.error);
        });
    } else {
      this.alertService.error('Les champs obligatoires ne sont pas remplis !');
    }
  }

  retourListe() {
    this.router.navigate(['rayons']);
  }

  vider() {
    this.rayon = new Rayon();
  }

}
