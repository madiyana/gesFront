import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categories } from '../../_models/index';
import { CategorieService } from '../../_services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorie-consult',
  templateUrl: './categorie-consult.component.html',
  styleUrls: []
})
export class CategorieConsultComponent implements OnInit {

  idCategorie: number;
  categorie: Categories;
  constructor( private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router) {
   
   }

  ngOnInit() {
    this.afficheCategorie();
  }

  afficheCategorie() {
    this.idCategorie = JSON.parse(localStorage.getItem("idCategorie"));
    this.categorieService.getById(this.idCategorie).subscribe(
      data => {
        this.categorie = data;
      }
    )
  }

  retourListe() {
    this.router.navigate(["categories"]);
   }

  modifier() {
    localStorage.setItem("pageCategorie", "modif");
    this.router.navigate(["categories/creer"]);
  }
}
