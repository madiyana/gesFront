import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fournisseurs, Stocks } from '../../_models/index';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../_services/stocks.service';

@Component({
  selector: 'app-stock-consult',
  templateUrl: './stock-consult.component.html'
})
export class StockConsultComponent implements OnInit {

  idStock: number;
  stock: Stocks;
  constructor(private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.afficheStock();
  }

  afficheStock() {
    this.idStock = JSON.parse(localStorage.getItem('idStock'));
    this.stockService.getById(this.idStock).subscribe(
      data => {
        this.stock = data;
      }
    );
  }

  retourListe() {
    this.router.navigate(['stocks']);
   }

  modifier() {
    localStorage.setItem('pageStock', 'modif');
    this.router.navigate(['stocks/creer']);
  }
}
