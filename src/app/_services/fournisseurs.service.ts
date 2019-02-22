import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Fournisseurs } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class FournisseurService {
    public token: string;
    public headers: string;
    private API_URL= environment.API_URL;

    constructor(private http: HttpClient) {
        this.token = JSON.stringify(localStorage.getItem('token'));
    }

    getAll() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.get<Fournisseurs[]>(this.API_URL + '/fournisseurs/retrieveListFournisseurs', {headers: headers});
    }

    getById(idFournisseur) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idFournisseur', idFournisseur.toString());

        return this.http.get<Fournisseurs>(this.API_URL + '/fournisseurs/retrieveFournisseursById', {headers: headers, params: param });
    }

    getByName(nom) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('nom', nom);
        return this.http.get<Fournisseurs[]>(this.API_URL + '/fournisseurs/retrieveFournisseursByName', {headers: headers, params: param });
    }

    create(fournisseurs: Fournisseurs) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.post<Fournisseurs>(this.API_URL + '/fournisseurs/createFournisseurs', fournisseurs, {headers: headers});
    }

    update(fournisseurs: Fournisseurs) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.put<Fournisseurs>(this.API_URL + '/fournisseurs/updateFournisseurs', fournisseurs, {headers: headers});
    }

    delete(idFournisseur) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idFournisseur', idFournisseur.toString());
        return this.http.delete(this.API_URL + '/fournisseurs/deleteFournisseurs', {headers: headers, params: param });
    }

}
