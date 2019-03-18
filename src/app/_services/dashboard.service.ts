import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Commandes } from '../_models/commandes';
import { ArticleCommandes } from '../_models/articleCommandes';
import { Articles, Fournisseurs } from '../_models';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {
  public token: string;
  public headers: string;
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {
    this.token = JSON.stringify(localStorage.getItem('token'));
  }

  getCommandeStatus(): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.token);
    return this.http.get(
      this.API_URL + '/dashboard/commandeStatus',
      { headers: headers }
    );
  }

  getCaVente(): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.token);
    return this.http.get(this.API_URL + '/dashboard/caVente', {
      headers: headers
    });
  }

  getPopularArticle(): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.token);
    return this.http.get(this.API_URL + '/dashboard/popularArticles', {
      headers: headers
    });
  }
}
