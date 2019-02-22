import { Component, OnInit, OnDestroy } from '@angular/core';

import '../assets/app.css';
import { AuthenticationService } from './_services/index';
import { Employes } from './_models/index';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id.toString(),
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  employes = new Employes();
  public href = '';
  model: any = {};
  public objDate = Date.now();
  ngOnInit(): void {
    this.href = this.router.url;

  /*  if (!this.authentificationService.id) {
      this.logout(this.authentificationService.infoUser());
    }*/
  }

  constructor(
    public authentificationService: AuthenticationService,
    private router: Router
  ) {
    this.employes = JSON.parse(localStorage.getItem('currentUser'));
  }

  logout(user) {
    this.model.identifiant = user.identifiant;
    this.model.motDePasse = user.motDePasse;
    localStorage.clear();
    this.authentificationService.logout(user).subscribe(user => {
      this.router.navigate(['/login']);
    });
  }

  getColor() {
    return 'active';
  }

  get infoUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user.prenom + ' ' + user.nom;
  }
}
