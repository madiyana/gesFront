import { Component, OnInit } from '@angular/core';
import { UniteMesure } from '../_models/uniteMesure';
import { AlertService } from 'angular-x-alerts';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitemesureService } from '../_services/unitemesure.service';

@Component({
  selector: 'app-unite-mesure',
  templateUrl: './unite-mesure.component.html',
  styleUrls: ['./unite-mesure.component.css']
})
export class UniteMesureComponent implements OnInit {

  uniteMesure: UniteMesure;
  public texteRecherche: string;
  public sortBy = 'nom';
  public sortOrder = 'asc';
  public itemsTotal = 0;
  public rowsOnPage = 10;
  public activePage = 1;
  idSelect = [];
  data: any;

  constructor(
    private unitemesureService: UnitemesureService,
    private alerteService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.removeItem('idUniteMesure');
    localStorage.removeItem('pageUniteMesure');
    this.listUniteMesure();
  }

   /**
   * Recuperation de la liste de tous les unite de mesures pour les afficher au tableau
   */
  listUniteMesure() {
    this.unitemesureService.getAll().subscribe(
      data => {
        this.data = data;
      }
    );
  }

  /**
   * Pus les id des differentes lignes selectionnées
   * @param idUniteMesure
   */
  ligneSelect(idUniteMesure: number) {
    this.idSelect.splice(this.idSelect.indexOf(idUniteMesure), 1);
    this.idSelect.push(idUniteMesure);
  }

  /**
   * Affiche information unite de mesure au dblClick
   * @param idUniteMesure
   */
  afficher(idUniteMesure: number) {
    localStorage.setItem('idUniteMesure', idUniteMesure.toString());
    this.router.navigate(['uniteMesure/consult']);
  }

  /**
   * Création d'un nouvel unite de mesure
   */
  creer() {
    this.router.navigate(['uniteMesure/creer']);

  }

  /**
   * Consultation nouvel unite de mesure
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
   * Suppression d'un unite de mesure
   */
  supprimer() {
    if (this.idSelect.length === 0) {
      this.alerteService.error('Erreur : Veuillez sélectionner une ligne');
    } else {
      for (const idCategorie of this.idSelect) {
        this.unitemesureService.delete(idCategorie).subscribe(
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
