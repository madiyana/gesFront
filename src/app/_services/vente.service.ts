import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vente } from '../_models/ventes';

@Injectable({
  providedIn: 'root'
})
export class VenteService {
  public token: string;
  public headers: string;
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {
    this.token = JSON.stringify(localStorage.getItem('token'));
  }

  create(vente, encaissement, rendu, montantTotal, idUser, typePaiement) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.token);
    const param = new HttpParams()
      .set('encaissement', encaissement)
      .set('rendu', rendu)
      .set('montantTotal', montantTotal)
      .set('typePaiement', typePaiement)
      .set('idUser', idUser);
    return this.http.post(this.API_URL + '/ventes/create', vente, {
      headers: headers,
      params: param
    });
  }

  getAll(): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.token);
    return this.http.get<Vente[]>(this.API_URL + '/ventes/retrieveListVentes', {
      headers: headers
    });
  }

  getDetailsVente(idVente): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.token);
    const param = new HttpParams().set('idVente', idVente);
    return this.http.get(this.API_URL + '/ventes/retrieveDetailsVentes', {
      headers: headers,
      params: param
    });
  }

  searchVenteCritere(dateDebut: string, dateFin: string): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.token);
    const param = new HttpParams()
      .set('dateDebut', dateDebut)
      .set('dateFin', dateFin);
    return this.http.get(this.API_URL + '/ventes/searchVente', {
      headers: headers,
      params: param
    });
  }

  delete(idVente, idLigne): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.token);
    const param = new HttpParams()
      .set('idLigne', idLigne)
      .set('idVente', idVente);
    return this.http.delete(this.API_URL + '/ventes/deleteLigneArticleVente', {
      headers: headers,
      params: param
    });
  }

  generateTicket(ventes) {

  }

}
