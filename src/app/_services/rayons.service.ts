import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Rayon } from '../_models/index';

@Injectable()
export class RayonService {

  public token: string;
    public headers: string;
    private API_URL= environment.API_URL;

    constructor(private http: HttpClient) {
        this.token = JSON.stringify(localStorage.getItem('token'));
}

getAll() {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers.append('Authorization', 'Bearer ' + this.token);
  return this.http.get<Rayon[]>(this.API_URL + '/rayons/retrieveListRayons', {headers: headers});
}

getById(idRayon) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers.append('Authorization', 'Bearer ' + this.token);
  const param = new HttpParams().set('idRayon', idRayon.toString());
  return this.http.get<Rayon>(this.API_URL + '/rayons/retrieveRayonsById', {headers: headers, params: param });
}

getByName(nom) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers.append('Authorization', 'Bearer ' + this.token);
  const param = new HttpParams().set('nom', nom);
  return this.http.get<Rayon[]>(this.API_URL + '/rayons/retrieveRayonsByName', {headers: headers, params: param });
}

create(rayon: Rayon) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers.append('Authorization', 'Bearer ' + this.token);
  return this.http.post<Rayon>(this.API_URL + '/rayons/createRayons', rayon, {headers: headers});
}

update(rayon: Rayon) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers.append('Authorization', 'Bearer ' + this.token);
  return this.http.put<Rayon>(this.API_URL + '/rayons/updateRayons', rayon, {headers: headers});
}

delete(idRayon) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers.append('Authorization', 'Bearer ' + this.token);
  const param = new HttpParams().set('idRayon', idRayon.toString());
  return this.http.delete(this.API_URL + '/rayons/deleteRayons', {headers: headers, params: param });
}

}
