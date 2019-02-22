import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Categories } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class CategorieService {

    public token: string;
    public headers: string;
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) {
        this.token = JSON.stringify(localStorage.getItem('token'));
    }

    getAll() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.get<Categories[]>(this.API_URL + '/categories/retrieveListCategories', {headers: headers});
    }

    getById(idCategorie) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idCategorie', idCategorie.toString());

        return this.http.get<Categories>(this.API_URL + '/categories/retrieveCategoriesById', {headers: headers, params: param });
    }

    getByName(nom, delay) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('nom', nom).set('delay', delay);

        return this.http.get<Categories[]>(this.API_URL + '/categories/retrieveCategoriesByName', {headers: headers, params: param });
    }

    create(categories: Categories) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.post<Categories>(this.API_URL + '/categories/createCategories', categories, {headers: headers});
    }

    update(categories: Categories) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.put<Categories>(this.API_URL + '/categories/updateCategories', categories, {headers: headers});
    }

    delete(idCategorie) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idCategorie', idCategorie.toString());
        return this.http.delete(this.API_URL + '/categories/deleteCategories', {headers: headers, params: param });
    }
}
