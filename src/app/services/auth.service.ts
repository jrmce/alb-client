import { Injectable }       from '@angular/core';
import { Http, Headers }    from '@angular/http';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { Account }        from '../models/account';

@Injectable()
export class AuthService {
  private authenticated = false;
  private authUrl = 'http://localhost:8080/authenticate';
  private logoutUrl = 'http://localhost:8080/logout';
  private meUrl = 'http://localhost:8080/me';
  private account: Account;

  redirectUrl: string;
  authenticatedSubject: BehaviorSubject<boolean>;

  constructor(private http: Http) {
    if (localStorage.getItem('authToken')) {
      this.authenticated = true;
    }

    this.authenticatedSubject = new BehaviorSubject<boolean>(this.authenticated);
  }

  login(email, password): Promise<any> {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.post(this.authUrl, JSON.stringify({ email: email, password: password }), { headers })
      .toPromise()
      .then((response) => {
        const data = response.json();

        if (data.token) {
          localStorage.setItem('authToken', data.token);
          this.authenticated = true;
          this.updateAuthSubject();
        }

        return data;
      })
      .catch(this.handleError)
  }

  logout(): Promise<any> {
    if (this.authenticated) {
      const token = localStorage.getItem('authToken');
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);

      return this.http.post(this.logoutUrl, { token }, { headers })
        .toPromise()
        .then((res) => {
          localStorage.removeItem('authToken');
          this.authenticated = false;
          this.account = null;
          this.updateAuthSubject();
        })
        .catch(this.handleError);
    }

    return Promise.reject('Not authenticated.');
  }

  me(): Promise<Account> {
    const token = localStorage.getItem('authToken');
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    return this.http.get(this.meUrl, { headers })
      .toPromise()
      .then(response => response.json().account as Account)
      .catch(this.handleError);
  }

  isAuthenticated() {
    return this.authenticated;
  }

  updateAuthSubject(): void {
    this.authenticatedSubject.next(this.authenticated);
  }

  getCurrentAccount(): Promise<Account> {
    if (this.account) {
      return Promise.resolve(this.account);
    }

    return this.me()
      .then((account) => {
        this.account = account;
        return account;
      })
      .catch(this.handleError);
  }

  getToken(): string {
    if (this.isAuthenticated()) {
      return localStorage.getItem('authToken');
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
