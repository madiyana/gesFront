import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Rayon } from '../_models/index';
import { Parametres } from '../_models/parametres';

@Injectable()
export class ParametreService {

  public token: string;
    public headers: string;
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) {
        this.token = JSON.stringify(localStorage.getItem('token'));
}

getAll() {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers.append('Authorization', 'Bearer ' + this.token);
  return this.http.get<Parametres>(this.API_URL + '/parametres/retrieve', {headers: headers});
}



create(rayon: Rayon) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers.append('Authorization', 'Bearer ' + this.token);
  return this.http.post<Parametres>(this.API_URL + '/parametres/create', rayon, {headers: headers});
}

}
