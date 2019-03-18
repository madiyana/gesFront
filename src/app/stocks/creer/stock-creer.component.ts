import { Component, OnInit } from '@angular/core';
import { Employes, Articles, Stocks } from '../../_models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorieService } from '../../_services/categories.service';
 import { StockService } from '../../_services/stocks.service';
import { Categories } from '../../_models/categories';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReferenceService } from '../../_services/reference.service';
import { UniteMesure } from '../../_models/uniteMesure';
import { SelectModule } from 'ng2-select';
import { Fournisseurs } from '../../_models/fournisseurs';
import { ArticlesService } from '../../_services/articles.service';
import { FournisseurService } from '../../_services/fournisseurs.service';
import { CommandesService } from '../../_services/commandes.service';
import { Commandes } from '../../_models/commandes';
import { ArticleCommandes } from '../../_models/articleCommandes';
import { EtatCommande } from '../../_models/enumEtatCommande';
import { AlertService } from 'angular-x-alerts';
import { DateValidator } from '../../_utils/dateValidator';

@Component({
  selector: 'app-stock-creer',
  templateUrl: './stock-creer.component.html',
  styleUrls: []
})
export class StockCreerComponent implements OnInit {

  id:any;
  stock = new Stocks();
  nom: string;
  idStock: number;
  articles: Articles[] = [];
  fournisseurs: Fournisseurs[] = [];
  commandes: Commandes[];
  articleCommande: any = []; // ArticleCommandes[] ;
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
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // Faire mise a jour dans cette page ==> Recupere id
    this.page = localStorage.getItem('pageStock');
    this.idStock = JSON.parse(localStorage.getItem('idStock'));
    if (this.page === 'modif' && this.idStock) {
      this.stockService.getById(this.idStock).subscribe(
        data => {
          this.stock = data;
          this.jour = this.stock.dateEntree.slice(0, 2);
          this.mois = this.stock.dateEntree.slice(3, 5);
          this.annee = this.stock.dateEntree.slice(6, 10);
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
    this.stock.dateEntree = this.jour + '/' + this.mois + '/' + this.annee;
    if (Stocks.verifyInput(this.stock)) {
      // Check if  date is OK
      if (!Number(this.stock.quantite) || !Number(this.stock.nbArticlesDefectueux)) {
        this.alertService.error('La quantité / et nombre article defectueux doivent être un nombre.');
        return;
      }
      if (!DateValidator.isValidDate(this.jour, this.mois, this.annee)) {
        this.alertService.error('La date n\'est pas valide.');
        return;
      }
      this.stockService.create(this.stock).subscribe(
        data => {
          localStorage.setItem('idStock', data.id.toString());
          this.router.navigate(['stocks/consult']);
        },
        error => {
          this.alertService.error('Erreur technique lors de l\'enregistrement');
        });
    } else {
      this.alertService.error('Les champs obligatoires ne sont pas remplis.');
    }
  }

  retourListe() {
    this.router.navigate(['stocks']);
  }

  vider() {
    this.stock = new Stocks();
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
    if (this.stock.commandes) {
      this.commandeSercie.getArticleCommande(this.stock.commandes.id).subscribe(
        data => {
          this.articles = data;
        }, error => {
          this.alertService.error('Erreur technique lors de l\'enregistrement');
        }
      )

      // Load Unit mesure
      this.commandeSercie.getFournisseurCommande(this.stock.commandes.id).subscribe(
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
