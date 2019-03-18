import { Component, OnInit } from '@angular/core';
import { ArticleRetour } from '../../../_models/retourArticle';
import { Articles, Fournisseurs } from '../../../_models';
import { Commandes } from '../../../_models/commandes';
import { StockService } from '../../../_services/stocks.service';
import { AlertService } from 'angular-x-alerts';
import { CommandesService } from '../../../_services/commandes.service';
import { FournisseurService } from '../../../_services/fournisseurs.service';
import { ArticlesService } from '../../../_services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleRetourService } from '../../../_services/article-retour.service';
import { EtatCommande } from '../../../_models/enumEtatCommande';

@Component({
  selector: 'app-creer-article-retour',
  templateUrl: './creer-article-retour.component.html'
})
export class CreerArticleRetourComponent implements OnInit {


  id:any;
  articleRetour = new ArticleRetour();
  nom: string;
  idStock: number;
  articles: Articles[] = [];
  fournisseurs: Fournisseurs[] = [];
  commandes: Commandes[];
  jour: string;
  mois: string;
  annee: string;
  page: string;
  constructor(
    private stockService: StockService,
    private alertService: AlertService,
    private commandeSercie: CommandesService,
    private fournisseursService: FournisseurService,
    private articlesServices: ArticlesService,
    private articleRetourService: ArticleRetourService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // Faire mise a jour dans cette page ==> Recupere id
    this.page = localStorage.getItem('pageArticleRetour');
    this.id = JSON.parse(localStorage.getItem('idArticleRetour'));
    if (this.page === 'modif' && this.id) {
      this.articleRetourService.getById(this.id).subscribe(
        data => {
          this.articleRetour = data;
        }
      );
    }

    this.loadDataCreate();

  }

  loadDataCreate() {
    // Load categories
    this.articlesServices.getAll().subscribe(
      data => {
        this.articles = data;
      }
    )

    // Load all fournisseurs
    this.fournisseursService.getAll().subscribe(
      data => {
        this.fournisseurs = data;
      }
    )
    // Recuperer les commande receptionné
    this.commandeSercie.getCommandeStatus(EtatCommande.RECEPT).subscribe(
      data => {
        this.commandes = data;
      }
    )
  }

  enregistrer() {
    if (ArticleRetour.verifyInput(this.articleRetour)) {
      // Check if  date is OK
      if (!Number(this.articleRetour.quantite)) {
        this.alertService.error('La quantité doit être un nombre.');
        return;
      }
      this.articleRetourService.create(this.articleRetour).subscribe(
        data => {
          localStorage.setItem('idArticleRetour', data.id.toString());
       //   this.router.navigate(['retourArticle/consult']);
        },
        error => {
          this.alertService.error('Erreur technique lors de l\'enregistrement');
        });
    } else {
      this.alertService.error('Les champs obligatoires ne sont pas remplis.');
    }
  }

  retourListe() {
    this.router.navigate(['retourArticle']);
  }

  vider() {
    this.articleRetour = new ArticleRetour();
  }


  compareArticles(c1: Articles, c2: Articles): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareFournisseur(c1: Fournisseurs, c2: Fournisseurs): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onInputEntry(event, nextInput) {
    const input = event.target;
    const length = input.value.length;
    const maxLength = input.attributes.maxlength.value;

    if (length >= maxLength) {
      nextInput.focus();
    }
  }

  loadArticleFournisseur() {
    if (this.articleRetour.commandes) {
      this.commandeSercie.getArticleCommande(this.articleRetour.commandes.id).subscribe(
        data => {
          this.articles = data;
        }, error => {
          this.alertService.error('Erreur technique lors de l\'enregistrement');
        }
      )

      // Load Unit mesure
      this.commandeSercie.getFournisseurCommande(this.articleRetour.commandes.id).subscribe(
        data => {
          this.fournisseurs = data;
        }, error => {
          this.alertService.error('Erreur technique lors de l\'enregistrement');
        }
      );
    } else {
      this.initList();
    }
  }

  initList() {
    this.loadDataCreate();
  }

}
