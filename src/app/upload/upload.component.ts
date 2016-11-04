import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }                 from '@angular/router';

import { AlbumService }       from '../album.service';
import { PhotoService }       from '../photo.service';
import { Photo }              from '../photo';
import { Album }              from '../album';

@Component({
  selector: 'alb-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  album: Album;
  previews: string[] = [];
  loadingPreviews: boolean = false;
  isUploading: boolean = false;
  loadingStatus: number = 0;

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const id = +params['id'];

      this.albumService.get(id)
        .then(album => this.album = album);
    });
  }

  getImageType(base64Type: string): string {
    switch(base64Type) {
      case 'image/png':
        return 'png';
      case 'image/jpeg':
        return 'jpg';
      case 'image/gif':
        return 'gif';
      case 'image/bmp':
        return 'bmp';
      default:
        return null;
    }
  }

  upload(): void {
    this.isUploading = true;
    let uploaded: number = 0;
    const total: number = this.previews.length;

    for (let photo of this.previews) {
      this.photoService.create(this.album.id, photo)
        .then((response) => {
          uploaded++;

          this.loadingStatus = (uploaded / total) * 100;
          this.previews = this.previews.filter(p => p !== photo);

          if (uploaded === total) {
            this.isUploading = false;
          }
        });
    }
  }

  remove(preview: string): void {
    this.previews = this.previews.filter(photo => photo !== preview);
  }

  fileInputChange = (fileInput: any): void => {
    this.loadingPreviews = true;

    let loaded = 0;

    for (let file of fileInput.target.files) {
      const filetype = this.getImageType(file.type);

      if (!filetype) {
        continue;
      }

      const reader = new FileReader();

      reader.onloadend = (ev: ProgressEvent) => {
        this.previews.push(reader.result);

        loaded++;

        if (loaded === fileInput.target.files.length) {
          this.loadingPreviews = false;
          fileInput.target.value = [];
        }
      };

      reader.readAsDataURL(file);
    }
  };
}
