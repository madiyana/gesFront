import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Stocks } from '../_models/index';

@Injectable()
export class StockService {

    public token: string;
    public headers: string;
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) {
        this.token = JSON.stringify(localStorage.getItem('token'));
    }

    getAll() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.get<Stocks[]>(this.API_URL + '/stocks/retrieveListStocks', {headers: headers});
    }

    getRuptureStock() {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + this.token);
      return this.http.get(this.API_URL + '/stocks/ruptureArticleStocks', {headers: headers});
    }

    getById(idStock) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idStock', idStock);
        return this.http.get<Stocks>(this.API_URL + '/stocks/retrieveStocksById', {headers: headers, params: param });
    }

    create(stocks: Stocks) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.post<Stocks>(this.API_URL + '/stocks/createStocks', stocks, {headers: headers});
    }

    update(stocks: Stocks) {
        return this.http.put('/stocks/updateStocks', stocks);
    }

    delete(idStock) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        const param = new HttpParams().set('idStock', idStock);
        return this.http.delete(this.API_URL + '/stocks/deleteStocks', {headers: headers, params: param });
    }

    createStockCommande(commandes) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.post(this.API_URL + '/stocks/createStockCommande', commandes, {headers: headers});
    }
}
