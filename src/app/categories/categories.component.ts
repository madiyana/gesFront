import { Component, OnInit } from '@angular/core';
import { Categories } from '../_models/categories';
import { CategorieService } from '../_services/categories.service';
import { AlertService } from 'angular-x-alerts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categorie: Categories;
  public texteRecherche: string;
  public sortBy = 'nom';
  public sortOrder = 'asc';
  public itemsTotal = 0;
  public rowsOnPage = 10;
  public activePage = 1;
  idSelect = [];
  data: any;
  timeoutSearch = null;
  tempoSearch = 1000; // en ms
  constructor(
    private categorieService: CategorieService,
    private alerteService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.removeItem('idCategorie');
    localStorage.removeItem('pageCategorie');
     this.listCategories();
  }

  /**
   * Recuperation de la liste de tous les categories pour les afficher au tableau
   */
  listCategories() {
    this.categorieService.getAll().subscribe(
      data => {
        this.data = data;
      }
    );
  }

  /**
   * Pus les id des differentes lignes selectionnées
   * @param idCategorie
   */
  ligneSelect(idCategorie: number) {
   /*  if (this.idSelect.indexOf(idCategorie) === -1) {
      this.idSelect.push(idCategorie);
    } else {
      this.idSelect.splice(this.idSelect.indexOf(idCategorie), 1);
    } */

    this.idSelect.splice(this.idSelect.indexOf(idCategorie), 1);
    this.idSelect.push(idCategorie);

  }

  /**
   * Affiche information categorie au dblClick
   * @param idCategorie
   */
  afficher(idCategorie: number) {
    localStorage.setItem('idCategorie', idCategorie.toString());
    this.router.navigate(['categories/consult']);
  }

  /**
   * Création d'un nouvel categorie
   */
  creer() {
    this.router.navigate(['categories/creer']);

  }

  /**
   * Consultation nouvel categorie
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
   * Suppression d'un categorie
   */
  supprimer() {
    if (this.idSelect.length === 0) {
      this.alerteService.error('Erreur : Veuillez sélectionner une ligne');
    } else {
      for (const idCategorie of this.idSelect) {
        this.categorieService.delete(idCategorie).subscribe(
          data => {
            this.data = this.data.filter(item => {
              return item.id !== idCategorie;
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

  // Recherche avec TEMPORISATION des alias qui matchent avec la saisie de l'utilisateur d'une personne
  searchArticleDelay() {
    if (this.timeoutSearch) {
      clearTimeout(this.timeoutSearch);
    }
    this.timeoutSearch = setTimeout(() => {
      this.searchArticle();
    }, this.tempoSearch);
  }

  searchArticle() {
    this.data = [];
    const inputTextLength =
      this.texteRecherche === null || this.texteRecherche === undefined ? 0 : this.texteRecherche.trim().length;
    const atLeastOneInputPersonContainsTwoCharacters = inputTextLength > 2;

    if (!this.texteRecherche) {
      this.listCategories();
    }
    if (!atLeastOneInputPersonContainsTwoCharacters) {
      return;
    }

    this.categorieService.getByName(this.texteRecherche, 'delay').subscribe(data => {
      this.data = data;
    });
  }

}
