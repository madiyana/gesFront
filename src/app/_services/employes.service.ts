import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Employes } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class EmployesService {
    public token: string;
    public headers: string;
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) {
        this.token = JSON.stringify(localStorage.getItem('token'));
    }

    getAll() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.get<Employes[]>(this.API_URL + '/employes/retrieveListEmployes', {headers: headers});
    }

    getById(idEmploye) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idEmploye', idEmploye.toString());

        return this.http.get<Employes>(this.API_URL + '/employes/retrieveEmployesById', {headers: headers, params: param });
    }

    getByName(nom) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('nom', nom);
        return this.http.get<Employes[]>(this.API_URL + '/employes/retrieveEmployesByName', {headers: headers, params: param });
    }

    create(employes: Employes) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.post<Employes>(this.API_URL + '/employes/createEmployes', employes, {headers: headers});
    }

    update(employes: Employes) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.put<Employes>(this.API_URL + '/employes/updateEmployes', employes, {headers: headers});
    }

    delete(idEmploye) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idEmploye', idEmploye.toString());
        return this.http.delete(this.API_URL + '/employes/deleteEmployes', {headers: headers, params: param });
    }

    updatePassword(employes: Employes) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.put(this.API_URL + '/employes/updatePassword', employes, {headers: headers});
    }
}
