import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Commandes } from '../_models/commandes';
import { ArticleCommandes } from '../_models/articleCommandes';
import { Articles, Fournisseurs } from '../_models';
import { environment } from '../../environments/environment';


@Injectable()
export class CommandesService {

    public token: string;
    public headers: string;
    private API_URL= environment.API_URL;

    constructor(private http: HttpClient) {
        this.token = JSON.stringify(localStorage.getItem('token'));
    }

    getAll() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.get<Commandes[]>(this.API_URL + '/commandes/retrieveListCommandes', {headers: headers});
    }

    getById(idCommande) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idCommande', idCommande.toString());

        return this.http.get<Commandes>(this.API_URL + '/commandes/retrieveCommandesById', {headers: headers, params: param });
    }

    getByListArticleCommande(idCommande) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idCommande', idCommande.toString());

        return this.http.get(this.API_URL + '/commandes/retrieveCommandesArticle', {headers: headers, params: param });
    }

    getArticleCommande(idCommande) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idCommande', idCommande.toString());

        return this.http.get<Articles[]>(this.API_URL + '/commandes/retrieveCommandesArticle', {headers: headers, params: param });
    }

    getFournisseurCommande(idCommande) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idCommande', idCommande.toString());

        return this.http.get<Fournisseurs[]>(this.API_URL + '/commandes/retrieveCommandeFournisseur', {headers: headers, params: param });
    }

    getCommandeStatus(status): any {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('status', status);

        return this.http.get<Commandes[]>(this.API_URL + '/commandes/retrieveListCommandesStatus', {headers: headers, params: param });
      }

    create(commandes: Commandes) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.post<Commandes>(this.API_URL + '/commandes/createCommandes', commandes, {headers: headers});
    }

    update(commandes: Commandes) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.put<Commandes>(this.API_URL + '/commandes/updateCommandes', commandes, {headers: headers});
    }

    delete(idCommande) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idCommande', idCommande.toString());
        return this.http.delete(this.API_URL + '/commandes/deleteCommandes', {headers: headers, params: param });
    }
}
