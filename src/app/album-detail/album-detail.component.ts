import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { PhotoService } from '../services/photo.service';
import { Album } from '../models/album';
import { Photo } from '../models/photo';

@Component({
  selector: 'alb-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})

export class AlbumDetailComponent implements OnInit {
  album: Album;
  showShareButtons: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private photoService: PhotoService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const id = +params['id'];

      this.albumService.get(id)
        .then(album => this.album = album);
    });
  }
}
