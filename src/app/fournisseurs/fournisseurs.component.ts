import { Component, OnInit } from '@angular/core';
import { Fournisseurs } from '../_models/index';
import { FournisseurService } from '../_services/fournisseurs.service';
import { AlertService } from 'angular-x-alerts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css']
})
export class FournisseursComponent implements OnInit {

  fournisseurs: Fournisseurs;
  public texteRecherche: string;
  public sortBy = 'nom';
  public sortOrder = 'asc';
  public itemsTotal = 0;
  public rowsOnPage = 10;
  public activePage = 1;
  idSelect = [];
  data: any;

  constructor(
    private fournisseurService: FournisseurService,
    private alerteService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.removeItem('idFournisseur');
    localStorage.removeItem('pageFournisseur');
    this.listFournisseurs();
  }

   /**
   * Recuperation de la liste de tous les fournisseurs pour les afficher au tableau
   */
  listFournisseurs() {
    this.fournisseurService.getAll().subscribe(
      data => {
        this.data = data;
      }
    );
  }

  /**
   * Pus les id des differentes lignes selectionnées
   * @param idFournisseur
   */
  ligneSelect(idFournisseur: number) {
  /*   if (this.idSelect.indexOf(idFournisseur) === -1) {
      this.idSelect.push(idFournisseur);
    } else {
      this.idSelect.splice(this.idSelect.indexOf(idFournisseur), 1);
    } */

    this.idSelect.splice(this.idSelect.indexOf(idFournisseur), 1);
    this.idSelect.push(idFournisseur);
  }

  /**
   * Affiche information fournisseur au dblClick
   * @param idFournisseur
   */
  afficher(idFournisseur: number) {
    localStorage.setItem('idFournisseur', idFournisseur.toString());
    this.router.navigate(['fournisseur/consult']);
  }

  /**
   * Création d'un nouvel fournisseur
   */
  creer() {
    this.router.navigate(['fournisseur/creer']);

  }

  /**
   * Consultation nouvel fournisseur
   */
  consulterLigneSelectionne() {
    if (this.idSelect.length === 1) {
      this.afficher(this.idSelect[0]);
    } else if (this.idSelect.length === 0) {
      this.alerteService.error('Erreur : Veuillez sélectionner une ligne');
    } else if (this.idSelect.length > 1) {
      this.alerteService.error('Erreur : Veuillez sélectionner une seule ligne');
    }
  }

  /**
   * Suppression d'un fournisseur
   */
  supprimer() {
    if (this.idSelect.length === 0) {
      this.alerteService.error('Erreur : Veuillez sélectionner une ligne');
    } else {
      for (const idCategorie of this.idSelect) {
        this.fournisseurService.delete(idCategorie).subscribe(
          data => {
            this.data = this.data.filter(item => {
              return item.id !== idCategorie;
            });
          },
          error => {
            console.log(error);
          }
        );
      }
    }
    this.idSelect = [];
    }
}
