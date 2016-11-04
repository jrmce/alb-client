import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';

import { Photo }          from './photo';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhotoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private url = 'http://localhost:8080/photos';

  constructor(private http: Http) { }

  getAll(): Promise<Photo[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().items as Photo[])
      .catch(this.handleError);
  }

  get(id: number): Promise<Photo> {
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => response.json().photo as Photo)
      .catch(this.handleError);
  }

  create(albumId: number, photo: string): Promise<Photo> {
    return this.http.post(`http://localhost:8080/albums/${albumId}/photos`, JSON.stringify({ data: photo }), { headers: this.headers })
      .toPromise()
      .then(response => response.json().photo as Photo)
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
