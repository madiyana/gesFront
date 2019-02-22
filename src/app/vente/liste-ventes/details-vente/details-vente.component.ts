import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VenteService } from '../../../_services/vente.service';

@Component({
  selector: 'app-details-vente',
  templateUrl: './details-vente.component.html',
  styleUrls: ['./details-vente.component.css']
})
export class DetailsVenteComponent implements OnInit, OnDestroy {

  id: number;
  private sub: any;
  public sortBy = 'nom';
  public sortOrder = 'asc';
  public itemsTotal = 0;
  public rowsOnPage = 10;
  public activePage = 1;
  idSelect = [];
  data: any;

  constructor(private route: ActivatedRoute,
    private venteService: VenteService,
    ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['idVente']; // (+) converts string 'id' to a number
      this.loadDetailsVente(this.id);
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadDetailsVente(id) {
    this.venteService.getDetailsVente(id).subscribe(data => {
      this.data = data;
    });
  }
}
