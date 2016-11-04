import { Component, Output, EventEmitter } from '@angular/core';

import { AlbumService }       from '../album.service';
import { Album }              from '../album';

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

    const album: Album = {
      title: title.trim()
    };

    this.albumService.create(album)
      .then(response => {
        this.isLoading = false;
        this.onCreated.emit(response);
      });
  }
}
