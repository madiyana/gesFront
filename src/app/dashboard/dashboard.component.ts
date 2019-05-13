import { Component, OnInit } from '@angular/core';
import { CommandesService } from '../_services/commandes.service';
import { EtatCommande } from '../_models/enumEtatCommande';
import { VenteService } from '../_services/vente.service';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nbCommandeRecu = 0;
  nbCommandeEnvoye = 0;
  nbCommandeEnCours = 0;
  nbCommandeAnnule = 0;

  caJour = 0;
  caMois = 0;
  caAnnee = 0;

  articlePopular: any[] = [];


  constructor(
    private dashBoardService: DashboardService
  ) { }

  ngOnInit() {
    this.commandeDashBoard();
    this.venteDashBoard();
    this.articleDashBoard();
  }


  /**
   * Les commandes
   */
  commandeDashBoard() {
    this.dashBoardService.getCommandeStatus().subscribe(data => {
      if (data) {
        this.nbCommandeRecu = data.nbRecu;
        this.nbCommandeEnCours = data.nbEnCours;
        this.nbCommandeEnvoye = data.nbEnvoye;
        this.nbCommandeAnnule = data.nbAnnule;
      }
    });
  }

  /**
   * CA des ventes jour et mois
   */
  venteDashBoard() {
    this.dashBoardService.getCaVente().subscribe(data => {
      if (data) {
        this.caJour = data.caJour;
        this.caMois = data.caMois;
      }
    });
  }

  /**
   * Articles le plus vendus du mois
   */
  articleDashBoard() {
    this.dashBoardService.getPopularArticle().subscribe(data => {
      if (data) {
       this.articlePopular = data;
      }
    });
  }


}
