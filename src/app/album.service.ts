import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';

import { Album }          from './album';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AlbumService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private albumsUrl = 'http://localhost:8080/albums';

  constructor(private http: Http) { }

  getAll(): Promise<Album[]> {
    return this.http.get(this.albumsUrl)
      .toPromise()
      .then(response => response.json().items as Album[])
      .catch(this.handleError);
  }

  get(id: number): Promise<Album> {
    return this.http.get(`${this.albumsUrl}/${id}`)
      .toPromise()
      .then(response => response.json().album as Album)
      .catch(this.handleError);
  }

  create(album: Album): Promise<Album> {
    return this.http.post(this.albumsUrl, JSON.stringify(album), { headers: this.headers })
      .toPromise()
      .then(response => response.json().album as Album)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.albumsUrl}/${id}`, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
