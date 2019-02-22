import { Component, OnInit } from '@angular/core';
import { Vente } from '../../_models/ventes';
import { AlertService } from 'angular-x-alerts';
import { VenteService } from '../../_services/vente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-liste-ventes',
  templateUrl: './liste-ventes.component.html',
  styleUrls: ['./liste-ventes.component.css']
})
export class ListeVentesComponent implements OnInit {
  idStock: number;
  vente: Vente[];
  public texteRecherche: string;
  public dateDebut: string;
  public dateFin: string;
  public sortBy = 'nom';
  public sortOrder = 'asc';
  public itemsTotal = 0;
  public rowsOnPage = 10;
  public activePage = 1;
  idSelect = [];
  data: any;
  constructor(
    private alerteService: AlertService,
    private venteService: VenteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.listVentes();
  }

  /**
   * Recuperation de la liste de toutes les ventes pour les afficher au tableau
   */
  listVentes() {
    this.venteService.getAll().subscribe(data => {
      this.data = data;
    });
  }


  navigateDetailsVente(idVente) {
    this.router.navigate(['/detailVente', idVente]);
  }
  /**
   * Search vente beetween vente
   */
  searchVente() {
    if (this.dateDebut && this.dateFin) {
      this.venteService.searchVenteCritere(this.transformDate(this.dateDebut), this.transformDate(this.dateFin)).subscribe(data => {
        this.data = data;
      });
    } else {
      this.alerteService.error('La date de début et fin sont obligatoires');
      this.data = [];
    }
  }

  transformDate(date) {
    if (date) {
        const table = date.split('-');
        date = table[2] + '/' + table[1] + '/' + table[0];
        return date;
    }
}

}
