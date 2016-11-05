import { Component, Output, EventEmitter } from '@angular/core';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
  selector: 'alb-create-album',
  outputs: ['onCreated'],
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})

export class CreateAlbumComponent {
  isLoading: boolean = false;
  onCreated: EventEmitter<Album> = new EventEmitter<Album>();

  constructor(private albumService: AlbumService) { }

  create(title: string): void {
    title = title.trim();
    this.isLoading = true;

    this.albumService.create(title.trim())
      .then(response => {
        this.isLoading = false;
        this.onCreated.emit(response);
      });
  }
}
