import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Employes } from '../_models/index';
import { EmployesService } from '../_services/employes.service';
import { HttpParams } from '@angular/common/http';
import { AlertService } from 'angular-x-alerts';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {
  employe: Employes;
  public texteRecherche: string;
  public sortBy = 'nom';
  public sortOrder = 'asc';
  public itemsTotal = 0;
  public rowsOnPage = 10;
  public activePage = 1;
  idSelect = [];
  data: any;
  constructor(
    private employeService: EmployesService,
    private alerteService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.removeItem('idEmploye');
      localStorage.removeItem('pageEmploye');
     this.listEmployes();
  }

  /**
   * Recuperation de la liste de tous les employes pour les afficher au tableau
   */
  listEmployes() {
    this.employeService.getAll().subscribe(
      data => {
        this.data = data;
      }
    );
  }

  /**
   * Pus les id des differentes lignes selectionnées
   * @param idEmploye
   */
  ligneSelect(idEmploye: number) {
    if (this.idSelect.indexOf(idEmploye) === -1) {
      this.idSelect.push(idEmploye);
    } else {
      this.idSelect.splice(this.idSelect.indexOf(idEmploye), 1);
    }
  }

  /**
   * Affiche information employe au dblClick
   * @param idEmploye
   */
  afficher(idEmploye: number) {
    localStorage.setItem('idEmploye', idEmploye.toString());
    this.router.navigate(['employes/consult']);
  }

  /**
   * Création d'un nouvel employe
   */
  creer() {
    this.router.navigate(['employes/creer']);

  }

  /**
   * Consultation nouvel employe
   */
  consulterLigneSelectionne() {
    if (this.idSelect.length === 1) {
      this.afficher(this.idSelect[0]);
    } else if (this.idSelect.length === 0) {
      this.alerteService.error('Erreur : Veuillez sélectionner une ligne');
    } else if (this.idSelect.length > 1) {
      this.alerteService.error('Erreur : Veuillez sélectionner une seule ligne');
    }
  }

  /**
   * Suppression d'un employe
   */
  supprimer() {
    if (this.idSelect.length === 0) {
      this.alerteService.error('Erreur : Veuillez sélectionner une ligne');
    } else {
      for (const idEmploye of this.idSelect) {
        this.employeService.delete(idEmploye).subscribe(
          data => {
            this.data = this.data.filter(item => {
              return item.id !== idEmploye;
            });
          },
          // tslint:disable-next-line:no-shadowed-variable
          error => {
            console.log(error);
          }
        );
      }
    }
    this.idSelect = [];
    }
  }
