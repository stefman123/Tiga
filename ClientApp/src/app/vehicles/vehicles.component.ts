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
  private readonly PAGE_SIZE = 3;
  queryResult: any = {};

  //queryResult: {
  //                vehicles: Vechicle[],
  //                totalItems : number
  //              };
  totalItems: any;
    //cilent server filtering
/*  allVehicles : Vechicle[];*/
  makes : KeyValuePair[];
  query: any = { pageSize: this.PAGE_SIZE};
  faSortAmountUpAlt = faSortAmountUpAlt;
  faSortAmountDown = faSortAmountDown;
  columns = [
    { title: 'Id' },
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

  OnFilterChange() {
    this.query.page = 1;
    this.getVehicles();
  }

  private getVehicles() {
    this.vehicleService.getAllVehicles(this.query)
      .subscribe(result => this.queryResult = result );
    }

  resetFilter(){
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };

    this.getVehicles();
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

  onPageChange(page) {
    this.query.page = page;
    this.getVehicles()
  }
}
