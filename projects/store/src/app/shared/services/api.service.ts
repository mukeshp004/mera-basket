import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string;

  constructor(protected http: HttpClient) { 
    this.baseUrl = 'http://localhost:8000/api';
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${path}`);
  }

  post(path: string, params: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${path}`, params);
  }
}
