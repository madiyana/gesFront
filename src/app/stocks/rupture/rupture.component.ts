import { Component, OnInit } from '@angular/core';
import { AlertService } from 'angular-x-alerts';
import { StockService } from '../../_services/stocks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rupture',
  templateUrl: './rupture.component.html',
  styleUrls: ['./rupture.component.css']
})
export class RuptureComponent implements OnInit {

  idStock: number;
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
      this.listRuptureStocks();
    }

   /**
     * Recuperation de la liste de tous les stocks pour les afficher au tableau
     */
    listRuptureStocks() {
      this.stockService.getRuptureStock().subscribe(
        data => {
          this.data = data;
        }
      );
    }

}
