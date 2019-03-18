import { Component, OnInit } from '@angular/core';
import { UnitemesureService } from '../../_services/unitemesure.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UniteMesure } from '../../_models/uniteMesure';

@Component({
  selector: 'app-unite-mesure-consult',
  templateUrl: './unite-mesure-consult.component.html',
  styleUrls: ['./unite-mesure-consult.component.css']
})
export class UniteMesureConsultComponent implements OnInit {

  idUnite: number;
  uniteMesure: UniteMesure;
  constructor( private uniteMesureService: UnitemesureService,
    private route: ActivatedRoute,
    private router: Router) {

   }

  ngOnInit() {
    this.afficheUnite();
  }

  afficheUnite() {
    this.idUnite = JSON.parse(localStorage.getItem('idUniteMesure'));
    this.uniteMesureService.getById(this.idUnite).subscribe(
      data => {
        this.uniteMesure = data;
      }
    )
  }

  retourListe() {
    this.router.navigate(['uniteMesure']);
   }

  modifier() {
    localStorage.setItem('pageUnite', 'modif');
    this.router.navigate(['uniteMesure/creer']);
  }

}
