import { Component, OnInit } from '@angular/core';
import { VenteService } from '../../_services/vente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annul-vente',
  templateUrl: './annul-vente.component.html',
  styleUrls: ['./annul-vente.component.css']
})
export class AnnulVenteComponent implements OnInit {

  public numeroVente: string;
  public sortBy = 'nom';
  public sortOrder = 'asc';
  public itemsTotal = 0;
  public rowsOnPage = 10;
  public activePage = 1;
  idSelect = [];
  data: any;
  constructor(
    private venteService: VenteService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  searchVenteDetails(){
    this.venteService.getDetailsVente(this.numeroVente).subscribe(data => {
      this.data = data;
    });
  }

  removeArticle(idLigne) {

    if (confirm('Suppression de l\'article ?')) {
      this.venteService.delete(this.numeroVente, idLigne).subscribe(
        data => {
          this.data = this.data.filter(ligneArticle => {
            return ligneArticle.id !== idLigne;
          });
        },
        error => {
        //  this.alerteService.error('Erreur technique lors de l\'enregistrement');
        }
      );
    }
  }

  backToVente() {
    this.router.navigate(['/ventes']);
  }
}
