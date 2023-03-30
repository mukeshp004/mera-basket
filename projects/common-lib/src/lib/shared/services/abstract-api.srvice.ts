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
  public abstract relativeUrl: string;

  constructor(protected http: HttpClient) {
    this.baseUrl = 'http://localhost:8000/api';
  }

  getRelativeUrl(url: string | undefined): string {
    return url ? url : this.relativeUrl;
  }

  setRelativeUrl(url: string) {
    this.relativeUrl = url;
    return this;
  }

  get(params?: any, url?: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.getRelativeUrl(url)}`, {
      params: params,
    });
  }

  post(params: any, url?: string): Observable<T> {
    return this.http.post<T>(
      `${this.baseUrl}/${this.getRelativeUrl(url)}`,
      params
    );
  }

  find(id: number, url?: string): Observable<T> {
    return this.http.get<T>(
      `${this.baseUrl}/${this.getRelativeUrl(url)}/${id}`
    );
  }

  put(id: number, params: any, url?: string): Observable<T> {
    return this.http.put<T>(
      `${this.baseUrl}/${this.getRelativeUrl(url)}/${id}`,
      params
    );
  }

  delete(id: number, url?: string) {
    return this.http.delete(
      `${this.baseUrl}/${this.getRelativeUrl(url)}/${id}`
    );
  }
}
