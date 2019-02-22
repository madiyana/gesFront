import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employes } from '../../_models/index';
import { EmployesService } from '../../_services/employes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employe-consult',
  templateUrl: './employe-consult.component.html',
  styleUrls: ['./employe-consult.component.css']
})
export class EmployeConsultComponent implements OnInit {

  idEmploye: number;
  employe: Employes;
  constructor( private employeService: EmployesService,
    private route: ActivatedRoute,
    private router: Router) {
   
   }

  ngOnInit() {
    this.afficheEmploye();
  }

  afficheEmploye() {
    this.idEmploye = JSON.parse(localStorage.getItem("idEmploye"));
    this.employeService.getById(this.idEmploye).subscribe(
      data => {
        this.employe = data;
      }
    )
  }

  retourListe() {
    this.router.navigate(["employes"]);
   }

  modifier() {
    localStorage.setItem("pageEmploye", "modif");
    this.router.navigate(["employes/creer"]);
  }
}
