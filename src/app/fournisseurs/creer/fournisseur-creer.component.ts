import { Component, OnInit } from '@angular/core';
import { Employes, Categories, Fournisseurs } from '../../_models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorieService } from '../../_services/categories.service';
import { AlertService } from 'angular-x-alerts';
import { FournisseurService } from '../../_services/fournisseurs.service';

@Component({
  selector: 'app-fournisseur-creer',
  templateUrl: './fournisseur-creer.component.html',
  styleUrls: []
})
export class FournisseurCreerComponent implements OnInit {

  fournisseur = new Fournisseurs();
  nom: string;
  idFournisseur: number;
  page: string;
  constructor(
    private fournisseurService: FournisseurService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // Faire mise a jour dans cette page ==> Recupere id
    this.idFournisseur = JSON.parse(localStorage.getItem('idFournisseur'));
    this.page = localStorage.getItem('pageFournisseur');
    if (this.page === 'modif' && this.idFournisseur) {
      this.fournisseurService.getById(this.idFournisseur).subscribe(
        data => {
          this.fournisseur = data;
        }
      );
    }
  }

  enregistrer() {
     if (Fournisseurs.verifyInput(this.fournisseur)) {
        this.fournisseurService.create(this.fournisseur).subscribe(
          data => {
            localStorage.setItem('idFournisseur', data.id.toString());
            this.router.navigate(['fournisseur/consult']);
          },
          error => {
            this.alertService.error('Erreur technique lors de l\'enregistrement');
          });
    } else {
      this.alertService.error('Le nom ou la raison sociale du fournisseur est obligatoire');
    }
  }

  retourListe() {
    this.router.navigate(['fournisseurs']);
   }

  vider() {
    this.fournisseur.telephone = null;
    this.fournisseur.telephone = '';
    this.fournisseur = new Fournisseurs();
  }

}
