import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  public getMakes() {
    return this.http.get<any>('/api/makes').pipe(map(res => res));
  }

  public getFeatures() {
    return this.http.get<any>("/api/Features").pipe(map(res => res))
  }

  public create(vehicle) {

    return this.http.post('/api/vehicles/create', vehicle).pipe(map(res => res))
  }

  public getVehicle(id){
    return this.http.get<any>("/api/vehicles/" + id).pipe(map(res => res))
  }

}
