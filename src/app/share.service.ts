import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';

import { Share }          from './share';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShareService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private url = 'http://localhost:8080/shares';

  constructor(private http: Http) { }

  getAll(): Promise<Share[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().items as Share[])
      .catch(this.handleError);
  }

  get(id: number): Promise<Share> {
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => response.json().share as Share)
      .catch(this.handleError);
  }

  create(share: Share): Promise<Share> {
    return this.http.post(this.url, JSON.stringify(share), { headers: this.headers })
      .toPromise()
      .then(response => response.json().share as Share)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
