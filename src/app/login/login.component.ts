import { Component }          from '@angular/core';
import { Router }             from '@angular/router';

import { AuthService }        from '../auth.service';

@Component({
  selector: 'alb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  login(): void {
    this.authService.login(this.email, this.password)
    .then((res) => {
      this.router.navigate(['/dashboard']);
    })
    .catch(this.handleError);
  }

  private handleError(error: any): void {
    console.error('Unable to login', error);
  }
}
