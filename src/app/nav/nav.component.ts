import {
  Component,
  OnInit,
  OnDestroy
}
                          from '@angular/core';
import { Router }         from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

import { AuthService }    from '../auth.service';
import { Account }        from '../account';

@Component({
  selector: 'alb-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  subscription: Subscription;
  currentAccount: Account;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.authenticatedSubject
      .subscribe(this.updateLoggedIn);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(this.handleError);
  }

  private updateLoggedIn = (loggedIn: boolean): void => {
    if (loggedIn) {
      this.authService.getCurrentAccount()
        .then((account) => {
          this.currentAccount = account;
          this.loggedIn = loggedIn;
        })
        .catch(this.handleError);
    } else {
      this.loggedIn = loggedIn;
      this.currentAccount = null;
    }
  }

  private handleError(error: any): void {
    console.error('Unable to login', error);
  }
}
