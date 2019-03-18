import { Component, OnInit } from '@angular/core';
import { ArticleRetour } from '../../_models/retourArticle';
import { AlertService } from 'angular-x-alerts';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleRetourService } from '../../_services/article-retour.service';

@Component({
  selector: 'app-retour-article',
  templateUrl: './retour-article.component.html'
})
export class RetourArticleComponent implements OnInit {
  id: number;
  articleRetour: ArticleRetour[];
  public texteRecherche: string;
  public sortBy = 'nom';
  public sortOrder = 'asc';
  public itemsTotal = 0;
  public rowsOnPage = 10;
  public activePage = 1;
  idSelect = [];
  data: any;
  constructor(
    private alerteService: AlertService,
    private articleRetourService: ArticleRetourService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      localStorage.removeItem('id');
    localStorage.removeItem('pageArticleRetour');

      // Load list stokcs
      this.listArticleRetour();
    }

   /**
     * Recuperation de la liste de tous les stocks pour les afficher au tableau
     */
    listArticleRetour() {
      this.articleRetourService.getAll().subscribe(
        data => {
          this.data = data;
        }
      );
    }

    /**
     * Pus les id des differentes lignes selectionnées
     * @param idStock
     */
    ligneSelect(idStock: number) {
      if (this.idSelect.indexOf(idStock) === -1) {
        this.idSelect.push(idStock);
      } else {
        this.idSelect.splice(this.idSelect.indexOf(idStock), 1);
      }
    }

    /**
     * Affiche information article au dblClick
     * @param idStock
     */
    afficher(id: number) {
      localStorage.setItem('idArticleRetour', id.toString());
      this.router.navigate(['retourArticle/consult']);
    }

    /**
     * Création d'un nouvequ stock
     */
    creer() {
      this.router.navigate(['retourArticle/creer']);
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
        this.alerteService.error('Erreur : Veuillez sélectionner une seule ligne');
      }
    }

    /**
     * Suppression d'un stock
     */
    supprimer() {
      if (this.idSelect.length === 0) {
        this.alerteService.error('Erreur : Veuillez sélectionner une ligne');
      } else {
        for (const id of this.idSelect) {
          this.articleRetourService.delete(id).subscribe(
            data => {
              this.data = this.data.filter(item => {
                return item.id !== id;
              });
            },
            error => {
              console.log(error);
            }
          )
        }
      }
      this.idSelect = [];
      }
}
