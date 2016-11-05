import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';

import { Photo }          from '../models/photo';
import { AuthService }  from './auth.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhotoService {

  private url = 'http://localhost:8080/photos';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http,
    private authService: AuthService) { }

  getAll(): Promise<Photo[]> {
    this.headers.set('Authorization', this.authService.getToken());

    return this.http
      .get(this.url, { headers: this.headers })
      .toPromise()
      .then(response => response.json().items as Photo[])
      .catch(this.handleError);
  }

  get(id: number): Promise<Photo> {
    this.headers.set('Authorization', this.authService.getToken());

    return this.http
      .get(`${this.url}/${id}`, { headers: this.headers })
      .toPromise()
      .then(response => response.json().photo as Photo)
      .catch(this.handleError);
  }

  create(albumId: number, photo: string): Promise<Photo> {
    this.headers.set('Authorization', this.authService.getToken());

    return this.http
      .post(`http://localhost:8080/albums/${albumId}/photos`, JSON.stringify({ data: photo }), { headers: this.headers })
      .toPromise()
      .then(response => response.json().photo as Photo)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    this.headers.set('Authorization', this.authService.getToken());

    return this.http
      .delete(`${this.url}/${id}`, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
