import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UniteMesure } from '../_models/uniteMesure';

@Injectable({
  providedIn: 'root'
})
export class UnitemesureService {
  public token: string;
  public headers: string;
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {
      this.token = JSON.stringify(localStorage.getItem('token'));
  }

  getAll() {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      return this.http.get<UniteMesure[]>(this.API_URL + '/unitemesure/retrieveListUnite', {headers: headers});
  }

  getById(idUnite) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      const param = new HttpParams().set('idUniteMesure', idUnite.toString());

      return this.http.get<UniteMesure>(this.API_URL + '/unitemesure/retrieveUniteById', {headers: headers, params: param });
  }

  getByName(nom) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      const param = new HttpParams().set('nom', nom);
      return this.http.get<UniteMesure[]>(this.API_URL + '/unitemesure/retrieveUniteByName', {headers: headers, params: param });
  }

  create(unite: UniteMesure) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      return this.http.post<UniteMesure>(this.API_URL + '/unitemesure/createUnite', unite, {headers: headers});
  }

  update(unite: UniteMesure) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      return this.http.put<UniteMesure>(this.API_URL + '/unitemesure/updateUnite', unite, {headers: headers});
  }

  delete(idUnite) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      const param = new HttpParams().set('idUniteMesure', idUnite.toString());
      return this.http.delete(this.API_URL + '/unitemesure/deleteUnite', {headers: headers, params: param });
  }

}
