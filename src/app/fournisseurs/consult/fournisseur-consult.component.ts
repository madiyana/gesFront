import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fournisseurs } from '../../_models/index';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from '../../_services/fournisseurs.service';

@Component({
  selector: 'app-fournisseur-consult',
  templateUrl: './fournisseur-consult.component.html'
})
export class FournisseurConsultComponent implements OnInit {

  idFournisseur: number;
  fournisseur: Fournisseurs;
  constructor(private fournisseurService: FournisseurService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.afficheFournisseur();
  }

  afficheFournisseur() {
    this.idFournisseur = JSON.parse(localStorage.getItem("idFournisseur"));
    this.fournisseurService.getById(this.idFournisseur).subscribe(
      data => {
        this.fournisseur = data;
      }
    )
  }

  retourListe() {
    this.router.navigate(["fournisseurs"]);
   }

  modifier() {
    localStorage.setItem("pageFournisseur", "modif");
    this.router.navigate(["fournisseur/creer"]);
  }
}
