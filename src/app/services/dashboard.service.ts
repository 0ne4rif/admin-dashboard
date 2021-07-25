import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const DASH_API = "http://test-demo.aemenersol.com/api/dashboard";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getDashboardMetaData(): Observable<any> {
    return this.http.get(DASH_API, httpOptions);
  }
}
