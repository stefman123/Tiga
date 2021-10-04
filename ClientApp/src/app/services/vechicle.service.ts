import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveVechicle } from 'app/models/SaveVechicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';

  getAllVehicles(filter) {
    var v = this.http.get<any>(this.vehiclesEndpoint + '?' + this.toQueryString(filter)).pipe(map(res => res))
    return v
  }
  toQueryString(filter: any) {
    var parts = [];
    for (var prop in filter) {
      var value = filter[prop];
      if (value != null && value != undefined) {
        parts.push(encodeURIComponent(prop) + '=' + encodeURIComponent(value))
      }
    }
     return parts.join('&');
    }

  deleteVehicle(id: number) {
   return this.http.delete(this.vehiclesEndpoint + '/' + id).pipe(map(res => res)) ;
  }

  constructor(private http: HttpClient) { }

  public getMakes() {
    return this.http.get<any>('/api/makes').pipe(map(res => res));
  }

  public getFeatures() {
    return this.http.get<any>("/api/Features").pipe(map(res => res))
  }

  public create(vehicle) {

    return this.http.post(this.vehiclesEndpoint + '/create', vehicle).pipe(map(res => res))
  }

  public getVehicle(id){
    // return this.http.get<any>("/api/vehicles/" + id).pipe(map(res => res))
    var v = this.http.get<any>(this.vehiclesEndpoint + '/' + id).pipe(map(res => res))
    return v
  }

  updateVehicle(vehicle: SaveVechicle) {
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle).pipe(map(res => res))
  }


}
