import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UploadService {

  private uploadUrl = 'http://localhost:5000/api/photos';
  constructor(private http: Http) { }

  uploadFiles(files: File[], albumId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      formData.set('albumId', albumId);

      for (let file of files) {
        formData.append('files[]', file, file.name);
      }

      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                  resolve(JSON.parse(xhr.response));
              } else {
                  reject(xhr.response);
              }
          }
      }

      xhr.open('POST', this.uploadUrl, true);
      xhr.send(formData);
    });
  }
}
