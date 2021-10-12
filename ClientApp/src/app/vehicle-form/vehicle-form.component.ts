import { Vechicle } from './../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vechicle.service';
import { ToastyService } from '../services/toasty.service'
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer
} from '@costlydeveloper/ngx-awesome-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SaveVechicle } from 'app/models/SaveVechicle';
import * as _ from 'underscore';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  test: any[];
  vehicle: SaveVechicle = {
    id:0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features:[],
    contact:{
      name:'',
      email:'',
      phone:''
    }
  };
  features: any[];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private vehicleService: VehicleService, private toastyService: ToastyService) { 

                // route.params.subscribe(p => {  this.vehicle.id = +p['id']; });
              //   route.paramMap.subscribe(params => {
              //     if(params.get('id'))
              //     this.vehicle.id = params.get('id');
              // })

              route.params.subscribe(p => {
                if(p['id']) 
                this.vehicle.id = +p['id'];
                });

                }

              

  ngOnInit(): void {

    var sources = [      
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures() ];

      if(this.vehicle.id)
        sources.push( this.vehicleService.getVehicle(this.vehicle.id))

    forkJoin(sources).subscribe(data => {   
      this.makes = data[0];
      this.features = data[1];
      if(this.vehicle.id)
        this.setVehicle(data[2])
        this.populateModels();
      }, err => 
        {
          if (err.status == 404)
          this.router.navigate(['/home']);
        })
  }

  setVehicle(v:Vechicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id')
  }

  toastNotification(error: string) {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle('Warning!');
    newToastNotification.setMessage(error);


    newToastNotification.setConfig({
      LayoutType: DialogLayoutDisplay.DANGER
    });


    newToastNotification.openToastNotification$();
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;

    console.log("VEHICLE", this.vehicle)
  }

private populateModels(){
  var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
  this.models = selectedMake ? selectedMake.models : [];
}

  onFeatureToggle(featureId, $event) {

    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);

      this.vehicle.features.splice(index, 1);
    }
  }

  onSubmit() {
    if(this.vehicle.id){
      this.vehicleService.updateVehicle(this.vehicle).subscribe(x => {
        this.toastyService.success();
      })
    }
  else{
      this.vehicleService.create(this.vehicle)
      .subscribe(
        x => {
          console.log(x)
          this.toastyService.success();
        }
      );
      }
  }


  delete() {
    if(confirm("Are you sure?")){
      this.vehicleService.deleteVehicle(this.vehicle.id).subscribe(x => {
        this.router.navigate(['/home']);
      });
    }
  }

}

