import { Component, OnInit } from '@angular/core';
import { Rayon } from '../_models/rayons';
import { RayonService } from '../_services/rayons.service';
import { AlertService } from 'angular-x-alerts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rayons',
  templateUrl: './rayons.component.html',
  styleUrls: ['./rayons.component.css']
})
export class RayonsComponent implements OnInit {

  rayon: Rayon;
  public texteRecherche: string;
  public sortBy = 'nom';
  public sortOrder = 'asc';
  public itemsTotal = 0;
  public rowsOnPage = 10;
  public activePage = 1;
  idSelect = [];
  data: any;
  constructor(
    private rayonsService: RayonService,
    private alerteService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    localStorage.removeItem('idRayon');
    localStorage.removeItem('pageRayon');
     this.listRayons();
  }

  listRayons() {
    this.rayonsService.getAll().subscribe(
      data => {
        this.data = data;
      }
    );
  }

   /**
   * Pus les id des differentes lignes selectionnées
   * @param idRayon
   */
  ligneSelect(idRayon: number) {
   /*  if (this.idSelect.indexOf(idRayon) === -1) {
      this.idSelect.push(idRayon);
    } else {
      this.idSelect.splice(this.idSelect.indexOf(idRayon), 1);
    } */

    this.idSelect.splice(this.idSelect.indexOf(idRayon), 1);
    this.idSelect.push(idRayon);
  }

  /**
   * Affiche information rayon au dblClick
   * @param idRayon
   */
  afficher(idRayon: number) {
    localStorage.setItem('idRayon', idRayon.toString());
    this.router.navigate(['rayons/consult']);
  }

  /**
   * Création d'un nouveau rayon
   */
  creer() {
    this.router.navigate(['rayons/creer']);

  }

  /**
   * Consultation nouveau rayon
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
   * Suppression d'un rayon
   */
  supprimer() {
    if (this.idSelect.length === 0) {
      this.alerteService.error('Erreur : Veuillez sélectionner une ligne');
    } else {
      for (const idRayon of this.idSelect) {
        this.rayonsService.delete(idRayon).subscribe(
          data => {
            this.data = this.data.filter(rayon => {
              return rayon.id !== idRayon;
            });
          },
          error => {
            this.alerteService.error('Erreur technique lors de l\'enregistrement');
          }
        );
      }
    }
    this.idSelect = [];
    }
}
