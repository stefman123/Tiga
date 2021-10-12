import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { Photo } from '../models/Photo';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  constructor(private http: HttpClient) { }

  upload(vehicleId, photo) {
      var formData = new FormData();
      formData.append('formFile', photo);

    return this.http.post<Photo>(`/api/vehicles/${vehicleId}/photos`, formData, {reportProgress : true, observe: 'events'}).pipe(map(res => res));

  }

  getPhotos(vehicleId){
    var photos = this.http.get<Photo[]>(`/api/vehicles/${vehicleId}/photos`).pipe(map(res => res))

    return photos
  }


}
