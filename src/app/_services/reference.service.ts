import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UniteMesure } from '../_models/uniteMesure';
import { environment } from '../../environments/environment';


@Injectable()
export class ReferenceService {
    public token: string;
    public headers: string;
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) {
        this.token = JSON.stringify(localStorage.getItem('token'));
    }

    getAllUniteMesure() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.get<UniteMesure[]>(this.API_URL + '/references/retrieveListUnitMesure', {headers: headers});
    }


}
