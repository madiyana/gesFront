import { Component, OnInit } from '@angular/core';
import { Rayon } from '../../_models/index';
import { RayonService } from '../../_services/rayons.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rayons-consult',
  templateUrl: './rayons-consult.component.html',
  styleUrls: ['./rayons-consult.component.css']
})
export class RayonsConsultComponent implements OnInit {

  idRayon: number;
  rayon: Rayon;
  constructor( private rayonService: RayonService,
    private route: ActivatedRoute,
    private router: Router) {
   
   }

  ngOnInit() {
    this.afficheRayons();
  }

  afficheRayons() {
    this.idRayon = JSON.parse(localStorage.getItem("idRayon"));
    this.rayonService.getById(this.idRayon).subscribe(
      data => {
        this.rayon = data;
      }
    )
  }

  retourListe() {
    this.router.navigate(["rayons"]);
   }

  modifier() {
    localStorage.setItem("pageRayon", "modif");
    this.router.navigate(["rayons/creer"]);
  }


}
