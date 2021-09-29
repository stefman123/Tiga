import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vechicle.service';
import { ToastyService } from '../services/toasty.service'
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer
} from '@costlydeveloper/ngx-awesome-popup';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  test: any[];
  vehicle: any = {
    features: [],
    contact: {},
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

    if(this.vehicle.id > 0){
      this.vehicleService.getVehicle(this.vehicle.id)
      .subscribe( (v: any) =>{ this.vehicle =v },
            err => 
            {
              if (err.status == 404)
              this.router.navigate(['/home']);
            })
    };

    // this.vehicleService.getVehicle(this.vehicle.id)
    // .subscribe(
    //         v => {this.vehicle = v ;}, 
    //         // err => 
    //         // {
    //         //   if (err.status == 404)
    //         //   this.router.navigate(['/home']);
    //         // }        
    //   );

    this.vehicleService.getMakes().subscribe(makes => {
      this.makes = makes

      // this.toastNotification()
      console.log("MAKES", this.makes)
    });

    this.vehicleService.getFeatures().subscribe(features => {
      this.features = features
      console.log("FEATURES", this.features)
    })
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
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;

    console.log("VEHICLE", this.vehicle)
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
    this.vehicleService.create(this.vehicle)
      .subscribe(
        x => console.log(x)
      );




  }

}

