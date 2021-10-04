import { Vechicle } from './../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'app/services/vechicle.service';
import { KeyValuePair } from 'app/models/KeyValuePair';
import { faSortAmountUpAlt,faSortAmountDown  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vechicle[];
    //cilent server filtering
/*  allVehicles : Vechicle[];*/
  makes : KeyValuePair[];
  query : any = {};
  faSortAmountUpAlt = faSortAmountUpAlt;
  faSortAmountDown = faSortAmountDown;
  columns = [
    { title: 'Id', },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    {}
  ];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {

    this.vehicleService.getMakes().subscribe(makes =>{ this.makes = makes });
    this.getVehicles();

    //cilent server filtering
    //this.vehicleService.getAllVehicles().subscribe(vehicle => {this.vehicles = this.allVehicles = vehicle })
  }
    //cilent server filtering
  //OnFilterChange(){
  //  var vehicles = this.allVehicles;

  //  if(this.query.makeId){
  //    vehicles = vehicles.query(v => v.make.id == this.query.makeId);
  //  }

  //  this.vehicles = vehicles;
  //}

    OnFilterChange(){
     this.getVehicles();
  }

  private getVehicles() {
        this.vehicleService.getAllVehicles(this.query).subscribe(vehicle => { this.vehicles = vehicle; });
    }

  resetFilter(){
    this.query = {};
    this.OnFilterChange();
  }

  sortBy(columnName:string) {

    if (this.query.sortBy == columnName)
    {
      this.query.isSortAscending =!this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }

    this.getVehicles();
  }
}