import { Component, OnInit } from '@angular/core';
import { Commandes } from '../../../_models/commandes';
import { CommandesService } from '../../../_services/commandes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EtatCommande } from '../../../_models/enumEtatCommande';
 import { StockConsultComponent } from '../../../stocks/consult/stock-consult.component';
import { Stocks } from '../../../_models';
import { StockService } from '../../../_services/stocks.service';
import { AlertService } from 'angular-x-alerts';

@Component({
  selector: 'app-commandes-consult',
  templateUrl: './commandes-consult.component.html',
  styleUrls: ['./commandes-consult.component.css']
})
export class CommandesConsultComponent implements OnInit {

  idCommande: number;
  commande: Commandes;
  public sortBy = 'nom';
  public sortOrder = 'asc';
  public itemsTotal = 0;
  public rowsOnPage = 10;
  public activePage = 1;
  constructor(
    private commandeService: CommandesService,
    private alertService: AlertService,
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.afficheCommande();
  }

  /**
   * Affichage info COMMANDE
   */
  afficheCommande() {
    this.idCommande = JSON.parse(localStorage.getItem("idCommande"));
    this.commandeService.getById(this.idCommande).subscribe(
      data => {
        this.commande = data;
      }
    )
  }

  /**
   * Affichage de la liste des commandes
   */
  retourListe() {
    this.router.navigate(["commandes"]);
  }

  /**
   * Redirection page de modifcation de commande
   */
  modifier() {
    localStorage.setItem("pageCommande", "modif");
    this.router.navigate(["commandes/creer"]);
  }

  /**
   * Annuler commande
   */
  annulerCommande() {
    // Modification etat commande et appel service Update$
    this.commande.etatCommande = EtatCommande.ANNULE;
    this.commandeService.create(this.commande).subscribe(
      data => {
        this.alertService.success("Annulation de la commande effectué avec succés.");
      },
      error => {
        console.log(error.error);
        this.alertService.error("Erreur annulation commande");
      });
  }

  /**
   * Envoi commande
   */
  envoyer() {
    if (this.commande.articlesCommande.length == 0) {
      this.alertService.error("Veuillez rajouter un ou plusieurs article à commander avant envoi.");
    } else {
      this.commande.etatCommande = EtatCommande.ENVOYE;
      this.commandeService.create(this.commande).subscribe(
        data => {
          this.alertService.success("Commande envoyé avec succés.");
          // localStorage.setItem("idCategorie", data.id.toString());
          //this.router.navigate(["categories/consult"]);
        },
        error => {
          console.log(error.error);
          this.alertService.error("Erreur creation commande");
        });
    }
  }

  /**
  * Reception commande
  */
  receptionne() {
    if (this.commande.articlesCommande.length == 0) {
      this.alertService.error("Veuillez rajouter un ou plusieurs article à commander avant recpetion.");
    } else {
      this.commande.etatCommande = EtatCommande.RECEPT;
      this.commandeService.create(this.commande).subscribe(
        data => {
          this.alertService.success("Commande receptionnée avec succés.");
          // Mise en stock de tous les articles 
          this.miseEnStockCommande(data);
          this.router.navigate["commandes"]
        },
        error => {
          console.log(error.error);
          this.alertService.error("Erreur creation commande");
        });
    }
  }

  /**
   * Mise en estock des qrticles des qu'il sont receptionnés
   * @param commande 
   */
  miseEnStockCommande(commande: Commandes) {
    this.stockService.createStockCommande(this.commande).subscribe(
      data => {
        this.alertService.success("Création des commandes dans le stock effectué avec succés.");
        
      },
      error => {
        console.log(error.error);
        this.alertService.error("Erreur creation commande");
      });
  }
}
