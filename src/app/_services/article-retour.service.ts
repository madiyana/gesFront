import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ArticleRetour } from '../_models/retourArticle';

@Injectable({
  providedIn: 'root'
})
export class ArticleRetourService {

  public token: string;
  public headers: string;
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {
      this.token = JSON.stringify(localStorage.getItem('token'));
  }

  getAll() {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      return this.http.get(this.API_URL + '/articlesretour/retrieveList', {headers: headers});
  }


  getById(id) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      const param = new HttpParams().set('id', id);
      return this.http.get<any>(this.API_URL + '/articlesretour/retrieveById', {headers: headers, params: param });
  }

  create(articleRetour: ArticleRetour) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      return this.http.post<ArticleRetour>(this.API_URL + '/articlesretour/create', articleRetour, {headers: headers});
  }

  update(articleRetour: ArticleRetour) {
      return this.http.put('/articlesretour/update', articleRetour);
  }

  delete(id) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      const param = new HttpParams().set('id', id);
      return this.http.delete(this.API_URL + '/articlesretour/delete', {headers: headers, params: param });
  }
}
