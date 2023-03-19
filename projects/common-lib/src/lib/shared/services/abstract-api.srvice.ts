import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractApiService<T> {
  /**
   * Base url of website
   */
  protected baseUrl: string;

  /**
   * Relative url of website
   */
  protected relativeUrl!: string;

  constructor(protected http: HttpClient) {
    this.baseUrl = 'http://localhost:8000/api';
  }

  getRelativeUrl(): string {
    return this.relativeUrl;
  }

  setRelativeUrl(url: string) {
    this.relativeUrl = url;
    return this;
  }

  get(params?: any): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.getRelativeUrl()}`, {
      params: params,
    });
  }

  post(params: any): Observable<T> {
    return this.http.post<T>(
      `${this.baseUrl}/${this.getRelativeUrl()}`,
      params
    );
  }

  find(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.getRelativeUrl()}/${id}`);
  }

  put(id: number, params: any): Observable<T> {
    return this.http.put<T>(
      `${this.baseUrl}/${this.getRelativeUrl()}/${id}`,
      params
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${this.getRelativeUrl()}/${id}`);
  }
}
