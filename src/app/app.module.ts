import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { PhotoComponent } from './photo/photo.component';
import { ShareComponent } from './share/share.component';
import { SignupComponent } from './signup/signup.component';
import { UploadComponent } from './upload/upload.component';
import { AuthService } from './auth.service';
import { AlbumService } from './album.service';
import { PhotoService } from './photo.service';
import { ShareService } from './share.service';
import { AuthGuard } from './auth.guard';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    AlbumDetailComponent,
    CreateAlbumComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    PhotoComponent,
    ShareComponent,
    SignupComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AlbumService,
    PhotoService,
    ShareService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
