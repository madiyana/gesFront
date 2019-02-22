import { Component, OnInit } from '@angular/core';
import { Employes, Categories } from '../../_models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorieService } from '../../_services/categories.service';
import { AlertService } from 'angular-x-alerts';

@Component({
  selector: 'app-categorie-creer',
  templateUrl: './categorie-creer.component.html',
  styleUrls: []
})
export class CategorieCreerComponent implements OnInit {

  categorie = new Categories();
  nom: string;
  idCategorie: number;
  page: string;

  constructor(
    private categorieService: CategorieService,
    private alertService: AlertService,
    private router: Router) {
  }

  ngOnInit() {
    this.idCategorie = JSON.parse(localStorage.getItem('idCategorie'));
    // Faire mise a jour dans cette page ==> Recupere id
    this.page = localStorage.getItem('pageCategorie');

    if (this.page === 'modif' && this.idCategorie) {
      this.categorieService.getById(this.idCategorie).subscribe(
        data => {
          this.categorie = data;
        }
      );
    }
  }


  enregistrer() {
    if (Categories.verifyInput(this.categorie)) {
      this.categorieService.create(this.categorie).subscribe(
        data => {
          this.alertService.success('Categorie enregistré avec succés.');
          localStorage.setItem('idCategorie', data.id.toString());
          this.router.navigate(['categories/consult']);
        },
        error => {
          this.alertService.error(error.error);
        });
    } else {
      this.alertService.error('Les champs obligatoires ne sont pas remplis.');
    }
  }

  retourListe() {
    this.router.navigate(['categories']);
  }

  vider() {
    this.categorie = new Categories();
  }

}
