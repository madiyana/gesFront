import { Component, OnInit } from '@angular/core';
import { Categories } from '../../../_models/categories';
import { Fournisseurs, Articles, Employes } from '../../../_models';
import { ArticlesService } from '../../../_services/articles.service';
import { FournisseurService } from '../../../_services/fournisseurs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Commandes } from '../../../_models/commandes';
import { ArticleCommandes } from '../../../_models/articleCommandes';
import * as _ from 'lodash';
 import { CommandesService } from '../../../_services/commandes.service';
import { EtatCommande } from '../../../_models/enumEtatCommande';
import { AlertService } from 'angular-x-alerts';

@Component({
  selector: 'app-commandes-creer',
  templateUrl: './commandes-creer.component.html',
  styleUrls: ['./commandes-creer.component.css']
})
export class CommandesCreerComponent implements OnInit {

  rowsOnPage = 5;
  activePage = 1;
  sortBy = 'no';
  sortOrder = 'asc';
  isArticleSelected: boolean;
  articleSelectedIndex: number;
  indexArticle: number;
  commande = new Commandes();
  observation: string;
  idCommande: number;
  page: string;
  listArticles: Articles[];
  listFournisseurs: Fournisseurs[];
  articleCommandeList: ArticleCommandes[] = [];
  articleCommande: ArticleCommandes = new ArticleCommandes();
  employe: Employes;
  constructor(
    private articleService: ArticlesService,
    private commandeService: CommandesService,
    private fournisseurService: FournisseurService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.page = localStorage.getItem('pageCommande');
    this.idCommande = JSON.parse(localStorage.getItem('idCommande'));
    if (this.page === 'modif' && this.idCommande) {
      this.commandeService.getById(this.idCommande).subscribe(
        data => {
          this.commande = data;
          this.articleCommandeList = this.commande.articlesCommande;
        }
      )
    }
    this.commande.employes = JSON.parse(localStorage.getItem('currentUser'));
    this.loadDataCreate();
  }

  /**
   * fournisseurs et articles
   */
  loadDataCreate() {
    this.articleService.getAll().subscribe(
      data => {
        this.listArticles = data;
      }
    )

    this.fournisseurService.getAll().subscribe(
      data => {
        this.listFournisseurs = data;
      }
    )
  }
  /**
   * Ajout commande au tableau
   */
  ajoutCommande() {
    let ajoutArticle: boolean = true;
    if (this.validiteArticleCommande(this.articleCommande)) {// SI les 3 champs renseignes
      if (this.articleCommandeList.length > 0) {
        // Check si pas different fournisseur
        this.articleCommandeList.forEach(currentArticle => {
          if (currentArticle.fournisseurs.id != this.articleCommande.fournisseurs.id) {
            ajoutArticle = false;
            this.alertService.error('Impossible de rajouter sur une commande des fournisseurs differents.');
            return;
          }
        });
      }

      if (ajoutArticle) {
        this.articleCommandeList.push(this.articleCommande);
        this.viderFormulaire();
      }

    } else {
      this.alertService.error('Veuillez renseigner un article, fournisseur et nombre à commander.');
    }

  }


  /**
   * Modifier info article selectionné
   */
  modifierArticle() {
    this.articleCommandeList[this.articleSelectedIndex] = this.articleCommande;
    this.viderFormulaire();
    this.isArticleSelected = false;
  }
  /**
   * Enregistre commande avec etat EN_COURS
   */
  enregistrer() {
    this.commande.articlesCommande = this.articleCommandeList;
    this.commande.etatCommande = EtatCommande.EN_COURS;
    this.commandeService.create(this.commande).subscribe(
      data => {
        this.alertService.success('Commande enregistré avec succés.');
        localStorage.setItem('idCommande', data.id.toString());
        this.router.navigate(['commandes/consult']);
      },
      error => {
        this.alertService.error('Erreur creation commande');
      });

  }

  /**
   * Envoi commande
   */
  envoyer() {
    if (this.articleCommandeList.length == 0) {
      this.alertService.error('Veuillez rajouter un ou plusieurs article à commander avant envoi.');
    } else {
      this.commande.articlesCommande = this.articleCommandeList;
      this.commande.etatCommande = EtatCommande.ENVOYE;
      this.commandeService.create(this.commande).subscribe(
       data => {
         this.alertService.success('Commande envoyé avec succés.');
         localStorage.setItem('idCommande', data.id.toString());
         this.router.navigate(['commandes/consult']);
       },
       error => {
         console.log('Erreur technique lors de l\'enregistrement');
         this.alertService.error('Erreur creation commande');
       });
     }
  }

  /**
   * Selection d'une ligne dans le tableau
   */
  selectionLigneArticle(articleCommande, index) {
    this.articleSelectedIndex = index;
    const copyOfArticleCommande = _.clone(articleCommande, true);
    this.articleCommande = copyOfArticleCommande;
    this.articleSelectedIndex = index;

  }

  /**
   * Annuler l'ajout des articles
   */
  annulerArticleCommande() {
    this.articleCommandeList = [];
  }

  annulerModificationArticle() {
    this.isArticleSelected = false;
    this.viderFormulaire();
  }

  /**
   * Suppression d'un article dans le tableau
   */
  supprimerArticleSelect() {
    this.articleCommandeList.splice(this.articleSelectedIndex, 1);
    this.isArticleSelected = false;
    this.viderFormulaire();
  }

  /**
   * Vider le formulaire d'ajout ou modif
   */
  viderFormulaire() {
    this.articleCommande = new ArticleCommandes();
  }

  /**
   * Verifier si les infos de la commande en cours est valide
   * @param articleCommande
   */
  validiteArticleCommande(articleCommande: ArticleCommandes) {

    // tslint:disable-next-line:max-line-length
    return articleCommande.articles && articleCommande.fournisseurs && articleCommande.nbreArticleCommande && Number(articleCommande.nbreArticleCommande);
  }

  /**
   * Vider le formulaire de la commande totale
   */
  vider() {
    this.viderFormulaire();
    this.articleCommandeList = [];
    this.commande = new Commandes();
  }

  /**
   * Retour page accueil commande
   */
  retourListe() {
    this.router.navigate(['commandes']);
  }
}
