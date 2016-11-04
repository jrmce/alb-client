import { Component, OnInit }  from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService }       from '../album.service';
import { PhotoService }       from '../photo.service';
import { Photo }              from '../photo';
import { Album }              from '../album';
import { Share }              from '../share';

@Component({
  selector: 'alb-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})

export class ShareComponent implements OnInit {
  show: string;
  albums: Album[];
  photos: Photo[];
  errorMessage: string;
  share: Share;

  constructor(
    private albumService: AlbumService,
    private photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.forEach((params) => {
      const type = params['type'];

      if (type === 'albums') {
        return this.showAlbums();
      }

      return this.showPhotos();
    });
  }

  showAlbums(): void {
    this.getAlbums()
      .then(() => this.show = 'albums');
  }

  showPhotos(): void {
    this.getPhotos()
      .then(() => this.show = 'photos');
  }

  addAlbum(album: Album): void {
    this.share.albums.push(album.id);
  }

  addPhoto(photo: Photo): void {
    this.share.photos.push(photo.id);
  }

  private getPhotos(): Promise<Photo[]> {
    return this.photoService.getAll()
      .then(photos => this.photos = photos)
      .catch(this.handleError);
  }

  private getAlbums(): Promise<Album[]> {
    return this.albumService
      .getAll()
      .then(albums => this.albums = albums)
      .catch(this.handleError);
  }

  private handleError = (error: any) => {
    this.errorMessage = 'There was an error!';
  }
}
