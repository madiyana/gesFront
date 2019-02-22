import { Component, OnInit } from '@angular/core';
import { Stocks } from '../_models/index';
import { StockService } from '../_services/stocks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'angular-x-alerts';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html'
})
export class StocksComponent implements OnInit {

  idStock: number;
  stock: Stocks[];
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
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      localStorage.removeItem('idStock');
    localStorage.removeItem('pageStock');

      // Load list stokcs
      this.listStocks();
    }

   /**
     * Recuperation de la liste de tous les stocks pour les afficher au tableau
     */
    listStocks() {
      this.stockService.getAll().subscribe(
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
    afficher(idStock: number) {
      localStorage.setItem('idStock', idStock.toString());
      this.router.navigate(['stocks/consult']);
    }

    /**
     * Création d'un nouvequ stock
     */
    creer() {
      this.router.navigate(['stocks/creer']);

    }

    /**
     * Consultation nouvel article
     */
    consulterLigneSelectionne() {
      if (this.idSelect.length === 1) {
        this.afficher(this.idSelect[0]);
      } else if (this.idSelect.length == 0) {
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
        for (const idStock of this.idSelect) {
          this.stockService.delete(idStock).subscribe(
            data => {
              this.data = this.data.filter(item => {
                return item.id !== idStock;
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
