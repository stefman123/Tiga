import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveVechicle } from 'app/models/SaveVechicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  deleteVehicle(id: number) {
   return this.http.delete('/api/vehicles/' + id).pipe(map(res => res)) ;
  }

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
    // return this.http.get<any>("/api/vehicles/" + id).pipe(map(res => res))
    var v = this.http.get<any>("/api/vehicles/" + id).pipe(map(res => res))
    return v
  }

  updateVehicle(vehicle: SaveVechicle) {
    return this.http.put('/api/vehicles/' + vehicle.id, vehicle).pipe(map(res => res))
  }


}
