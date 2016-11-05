import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { UploadComponent } from './upload/upload.component';
import { ShareComponent } from './share/share.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'albums/:id',
    component: AlbumDetailComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'albums/:id/upload',
    component: UploadComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'share/:type',
    component: ShareComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
