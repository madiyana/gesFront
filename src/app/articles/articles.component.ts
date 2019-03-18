import { Component, OnInit } from '@angular/core';
import { Articles } from '../_models/index';
import { ArticlesService } from '../_services/articles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'angular-x-alerts';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  idArticle: number;
  articles: Articles[];
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
    private alerteService: AlertService,
    private articleService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Load list articles
    localStorage.removeItem('idArticle');
    localStorage.removeItem('pageArticle');
    this.listArticles();
  }

  /**
   * Recuperation de la liste de tous les articles pour les afficher au tableau
   */
  listArticles() {
    this.articleService.getAll().subscribe(data => {
      this.data = data;
    });
  }

  /**
   * Pus les id des differentes lignes selectionnées
   * @param idArticle
   */
  ligneSelect(idArticle: number) {
    this.idSelect.splice(this.idSelect.indexOf(idArticle), 1);
    this.idSelect.push(idArticle);
  }

  /**
   * Affiche information article au dblClick
   * @param idArticle
   */
  afficher(idArticle: number) {
    localStorage.setItem('idArticle', idArticle.toString());
    this.router.navigate(['articles/consult']);
  }

  /**
   * Création d'un nouvel article
   */
  creer() {
    this.router.navigate(['articles/creer']);
  }

  /**
   * Consultation nouvel article
   */
  consulterLigneSelectionne() {
    if (this.idSelect.length === 1) {
      this.afficher(this.idSelect[0]);
    } else if (this.idSelect.length === 0) {
      this.alerteService.error('Erreur : Veuillez sélectionner une ligne');
    } else if (this.idSelect.length > 1) {
      this.alerteService.error(
        'Erreur : Veuillez sélectionner une seule ligne'
      );
    }
  }

  /**
   * Suppression d'un article
   */
  supprimer() {
    if (this.idSelect.length === 0) {
      this.alerteService.error('Erreur : Veuillez sélectionner une ligne');
    } else {
      for (const idArticle of this.idSelect) {
        this.articleService.delete(idArticle).subscribe(
          data => {
            this.data = this.data.filter(item => {
              return item.id !== idArticle;
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
      this.listArticles();
    }
    if (!atLeastOneInputPersonContainsTwoCharacters) {
      return;
    }

    this.articleService.getByName(this.texteRecherche, 'delay').subscribe(data => {
      this.data = data;
    });
  }
}
