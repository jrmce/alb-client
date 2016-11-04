import { Component, EventEmitter, Input, Output }   from '@angular/core';
import { Router }                                   from '@angular/router';

import { AlbumService }                             from '../album.service';
import { Album }                                    from '../album';

@Component({
  selector: 'alb-album',
  inputs: ['album', 'shareButtons'],
  outputs: ['onDeleted'],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent {
  album: Album;
  onDeleted: EventEmitter<Album> = new EventEmitter<Album>();
  shareButtons: boolean;

  constructor(
    private albumService: AlbumService,
    private router: Router) { }

  goToAlbum(album: Album): void {
    this.router.navigate(['/albums', this.album.id]);
  }

  delete(album: Album): void {
    this.albumService.delete(album.id)
      .then(() => {
        this.onDeleted.emit(album)
      });
  }
}
