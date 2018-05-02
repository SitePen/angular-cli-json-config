import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EnvironmentService } from './environment.service';

export interface HttpRequestOptions {
	headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
	params?: HttpParams;
	reportProgress?: boolean;
	withCredentials?: boolean;
}

@Injectable()
export class ApiService<M extends { [key: string]: any; }> {

  constructor(private http: HttpClient, private env: EnvironmentService) { }

	get<K extends keyof M>(path: K, options?: HttpRequestOptions): Observable<M[K]['get']>;
	get(path: string, options?: HttpRequestOptions): Observable<any>;
  get(path: string, options?: HttpRequestOptions): Observable<any> {
    return this.http.get(this.transformPath(path), options);
  }

	delete<K extends keyof M>(path: K, options?: HttpRequestOptions): Observable<M[K]['delete']>;
	delete(path: string, options?: HttpRequestOptions): Observable<any>;
  delete(path: string, options?: HttpRequestOptions): Observable<any> {
    return this.http.delete(this.transformPath(path), options);
  }

	post<K extends keyof M>(path: K, body: any, options?: HttpRequestOptions): Observable<M[K]['post']>;
	post(path: string, body: any, options?: HttpRequestOptions): Observable<any>;
  post(path: string, body: any, options?: HttpRequestOptions): Observable<any> {
    return this.http.post(this.transformPath(path), body, options);
  }

	put<K extends keyof M>(path: K, body: any, options?: HttpRequestOptions): Observable<M[K]['put']>;
	put(path: string, body: any, options?: HttpRequestOptions): Observable<any>;
  put(path: string, body: any, options?: HttpRequestOptions): Observable<any> {
    return this.http.put(this.transformPath(path), body, options);
  }

  private transformPath(path: string) {
    return `${this.env.environment.apiBaseUrl}${path}`;
  }
}
