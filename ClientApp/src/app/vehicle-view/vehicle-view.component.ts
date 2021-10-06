import { KeyValuePair } from './../models/KeyValuePair';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveVechicle } from 'app/models/SaveVechicle';
import { forkJoin } from 'rxjs';
import * as _ from 'underscore';
import { Vechicle } from '../models/vehicle';
import { VehicleService } from '../services/vechicle.service';


@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {
  vehicle: Vechicle = {
    id:0,
    make: {
       id:0,
       name:''
    },
     model: {
      id:0,
      name:''
   },
    isRegistered: false,
    features:[],
    contact:{
      name:'',
      email:'',
      phone:''
    },
    lastUpdate:""
  };
  makes: any[];
  features: any[];
  models: any[];


  constructor(private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService) {

    route.params.subscribe(p => {
      if (p['id'])
        this.vehicle.id = +p['id'];
    });

  
  }

  ngOnInit(): void {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id))

    forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];
      if (this.vehicle.id)
        this.setVehicle(data[2])
      //this.populateModels();
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    })
  }

  onFeatureToggle(featureId, $event) {

    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);

      this.vehicle.features.splice(index, 1);
    }
  }


  setVehicle(v: Vechicle) {
    this.vehicle.id = v.id;
    this.vehicle.make.id = v.make.id;
    this.vehicle.make.name = v.make.name;
    this.vehicle.model.id = v.model.id;
    this.vehicle.model.name = v.model.name;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = v.features
  }

  delete() {
    if(confirm("Are you sure?")){
      this.vehicleService.deleteVehicle(this.vehicle.id).subscribe(x => {
        this.router.navigate(['/home']);
      });
    }
  }

  edit(){
    this.router.navigate(['vehicles/' + this.vehicle.id]);
  }

viewVehicles(){
  this.router.navigate(['vehicles']);
}

  }

