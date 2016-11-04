import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Photo }                                  from '../photo';
import { PhotoService }                           from '../photo.service';

@Component({
  selector: 'alb-photo',
  inputs: ['photoId', 'showShare'],
  outputs: ['onDelete'],
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})

export class PhotoComponent implements OnInit {
  photoId: number;
  photo: Photo;
  photoSrc: string;
  showShare: boolean;
  onDelete: EventEmitter<Photo> = new EventEmitter<Photo>();

  constructor(private photoService: PhotoService) { }

  delete(photo: Photo): void {
    this.photoService.delete(this.photoId);
  }

  ngOnInit(): void {
    this.photoService.get(this.photoId)
        .then((photo) => {
          this.photo = photo;
          this.photoSrc = this.getPhotoSrcString();
        });
  }

  private getPhotoSrcString = (): string => {
    const prefix = `data:image/${this.photo.type};base64,`;
    return `${prefix}${this.photo.data}`;
  }
}
