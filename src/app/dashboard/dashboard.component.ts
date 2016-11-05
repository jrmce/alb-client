import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
  selector: 'alb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  errorMessage: string;
  albums: Album[];

  constructor(
    private albumService: AlbumService,
    private router: Router) { }

  ngOnInit(): void {
    this.albumService
      .getAll()
      .then(albums => this.albums = albums)
      .catch(this.handleError)
  }

  onDeleted(album: Album): void {
    this.albums = this.albums.filter(a => a !== album);
  }

  onCreated(album: Album): void {
    this.albums.push(album);
  }

  private handleError = (error: any) => {
    this.errorMessage = 'There was an error!';
  }
}
