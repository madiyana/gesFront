import { Component, OnInit } from '@angular/core';
import { AlertService } from 'angular-x-alerts';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandesService } from '../_services/commandes.service';
import { Commandes } from '../_models/commandes';
import { EtatCommande } from '../_models/enumEtatCommande';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  idCommande: number;
  commandes: Commandes[];
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
    private commandeService: CommandesService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    // Load list commandes
    localStorage.removeItem("idCommande");
    localStorage.removeItem("pageCommande");
    this.listCommandes();
  }

  /**
    * Recuperation de la liste de tous les commandes pour les afficher au tableau
    */
  listCommandes() {
    this.commandeService.getAll().subscribe(
      data => {
        this.data = data;
      }
    )
  }

  /**
   * Pus les id des differentes lignes selectionnées
   * @param idCommande 
   */
  ligneSelect(idCommande: number) {
    if (this.idSelect.indexOf(idCommande) === -1) {
      this.idSelect.push(idCommande);
    } else {
      this.idSelect.splice(this.idSelect.indexOf(idCommande), 1);
    }
  }

  /**
   * Affiche information commande au dblClick
   * @param idCommande 
   */
  afficher(idCommande: number) {
    localStorage.setItem("idCommande", idCommande.toString());
    this.router.navigate(["commandes/consult"]);
  }

  /**
   * Création d'un nouvel commande
   */
  creer() {
    this.router.navigate(["commandes/creer"]);

  }

  /**
   * Consultation nouvel commande
   */
  consulterLigneSelectionne() {
    if (this.idSelect.length === 1) {
      this.afficher(this.idSelect[0]);
    } else if (this.idSelect.length == 0) {
      this.alerteService.error("Erreur : Veuillez sélectionner une ligne");
    } else if (this.idSelect.length > 1) {
      this.alerteService.error("Erreur : Veuillez sélectionner une seule ligne");
    }
  }

  
  /**
   * Suppression d'un commande
   */
  supprimer() {
    if (this.idSelect.length == 0) {
      this.alerteService.error("Erreur : Veuillez sélectionner une ligne");
    } else {
      for (const idCommande of this.idSelect) {
        this.commandeService.delete(idCommande).subscribe(
          data => {
            this.data = this.data.filter(item => {
              return item.id !== idCommande;
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

