import { ToastyService } from './../services/toasty.service';
import { KeyValuePair } from './../models/KeyValuePair';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveVechicle } from 'app/models/SaveVechicle';
import { forkJoin } from 'rxjs';
import * as _ from 'underscore';
import { Vechicle } from '../models/vehicle';
import { VehicleService } from '../services/vechicle.service';
import { PhotoService } from '../services/photo.service';
import { Photo } from 'app/models/Photo';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';


@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {
  photos: any[];
  vehicle: Vechicle = {
    id: 0,
    make: {
      id: 0,
      name: ''
    },
    model: {
      id: 0,
      name: ''
    },
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: ''
    },
    lastUpdate: ""
  };
  makes: any[];
  features: any[];
  models: any[];
  //referencing Dom element
  @ViewChild('fileInput') fileInput: ElementRef;
  progress: number = 0;


  constructor(private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService,
                private photoService: PhotoService , private toastyService: ToastyService) {
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

    //this.photoService.getPhotos(this.vehicle.id).subscribe((photos : Photo[]) => this.photos = photos, err => console.log(err));
    this.photoService.getPhotos(this.vehicle.id).subscribe(photos => this.photos = photos, err => console.log(err));
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
    if (confirm("Are you sure?")) {
      this.vehicleService.deleteVehicle(this.vehicle.id).subscribe(x => {
        this.router.navigate(['/home']);
      });
    }
  }

  edit() {
    this.router.navigate(['vehicles/' + this.vehicle.id]);
  }

  viewVehicles() {
    this.router.navigate(['vehicles']);
  }

  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = '';
    this.photoService.upload(this.vehicle.id, file
      ).subscribe(  (event: HttpEvent<any>): void => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            this.photos.push(event.body);

            setTimeout(() => {
              this.progress = 0;
            }, 1500);
        }
    },
      err => {
        this.toastyService.error('Error', err.error);
      }
    )


    // this.photoService.upload(this.vehicle.id, nativeElement.files[0]).pipe(
    //   map((event) => {
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         console.log('Request has been made!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         console.log('Response header has been received!');
    //         break;
    //       case HttpEventType.UploadProgress:
    //         this.progress = Math.round(event.loaded / event.total * 100);
    //         console.log(`Uploaded! ${this.progress}%`);
    //         break;
    //       case HttpEventType.Response:
    //         console.log('User successfully created!', event.body);
    //         this.photos.push(event.body);

    //         setTimeout(() => {
    //           this.progress = 0;
    //         }, 1500);
    //     }
    //   })).subscribe((event: any) => {
    //     if (typeof (event) === 'object') {

    //       // this.photos.push(event.body);
    //     }
    //   })

  }



}

