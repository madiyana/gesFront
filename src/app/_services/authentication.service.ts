import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Employes } from '../_models/employes';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    employes: Employes;
    token = JSON.stringify(localStorage.getItem('token'));
    private API_URL = environment.API_URL;
    public nom;
    public prenom;
    public id;
    constructor(private http: HttpClient, private router: Router) {
        this.employes = new Employes();
    }

    login(user: any) {
  /*      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   let token = null;
  //  let employes = null;

  //  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  // headers.append('Authorization', 'Bearer ' + this.token);
  //   return this.http.post<any>('http://94.125.162.135:9191/employes/authenticate', user, {headers});
  */

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Access-Control-Allow-Origin', '*');
    //    headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.post<any>(this.API_URL +  '/employes/authenticate', user, {headers});

     /*   return this.http.post<any>(this.API_URL + '/employes/authenticate', model, {headers}).map(user => {

          for (let key in user) {
              employes = user[key];
              this.employes = user[key];
              token = key;
          }
          if (token !== null && employes !== null) {
              localStorage.setItem('token', token);
              localStorage.setItem('currentUser', JSON.stringify(employes));
              localStorage.setItem('isAuthenticated', "OK");
          }
          return employes;
      });*/
    }
    infoUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getProfilUSer() {
      const infoUser = JSON.parse(localStorage.getItem('currentUser'));
      return infoUser['profil'];
    }

    logout(model: any) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      return this.http.post<any>(this.API_URL +  '/employes/logout', model, {headers});

   /*   return this.http.post<any>('http://94.125.162.135:9191/toubasoft-ERP/employes/logout', model, {headers}); .map(user => {
        localStorage.clear();
        this.router.navigate(['/login']);
      });*/
    }

    redirectLogin() {
      localStorage.clear();
      this.router.navigate(['/login']);
    }


    get infoUsers() {

      return this.prenom + ' ' + this.nom;
    }

    isAuthenticated() {
        if (localStorage.getItem('isAuthenticated')) {
            return true;
        }
        return false;
    }
}
