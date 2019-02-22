import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Articles } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class ArticlesService {
    public token: string;
    public headers: string;
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) {
        this.token = JSON.stringify(localStorage.getItem('token'));
    }

    getAll() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.get<Articles[]>(this.API_URL + '/articles/retrieveListArticles', {headers: headers});
    }

    getById(idArticle) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idArticle', idArticle.toString());

        return this.http.get<Articles>(this.API_URL + '/articles/retrieveArticlesById', {headers: headers, params: param });
    }

    getByName(nom, delay) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('nom', nom).set('delay', delay);

        return this.http.get(this.API_URL + '/articles/retrieveArticlesByName', {headers: headers, params: param });
    }



    getByReference(reference) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      const param = new HttpParams().set('reference', reference);
      return this.http.get<Articles>(this.API_URL + '/articles/retrieveArticlesByReference', {headers: headers, params: param });
  }

    create(articles: Articles) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.post<Articles>(this.API_URL + '/articles/createArticles', articles, {headers: headers});
    }

    update(articles: Articles) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.put<Articles>(this.API_URL + '/articles/updateArticles', articles, {headers: headers});
    }

    delete(idArticle) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idArticle', idArticle.toString());
        return this.http.delete(this.API_URL + '/articles/deleteArticles', {headers: headers, params: param });
    }

}
