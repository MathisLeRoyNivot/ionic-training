import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-history',
  templateUrl: './filter-history.component.html',
  styleUrls: ['./filter-history.component.scss'],
})
export class FilterHistoryComponent implements OnInit {

  default: boolean = false;

  nameAsc: Boolean = false;
  nameDesc: Boolean = false;

  dateAsc: Boolean = false;
  dateDesc: Boolean = false;

  constructor(
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  filterDefault(event) {
    let checkBoxValue = event.returnValue;

    if(checkBoxValue) {
      this.nameAsc = false;
      this.nameDesc = false;
      this.dateAsc = false;
      this.dateDesc = false;
    }
  }

  filterByNameAsc(event) {
    let checkBoxValue = event.returnValue;
    
    if(checkBoxValue) {
      this.default = false;
      this.nameDesc = false;
      this.dateAsc = false;
      this.dateDesc = false;
    }
  }

  filterByNameDesc(event) {
    let checkBoxValue = event.returnValue;
    
    if(checkBoxValue) {
      this.default = false;
      this.nameAsc = false;
      this.dateAsc = false;
      this.dateDesc = false;
    }
  }

  filterByDateAsc(event) {
    let checkBoxValue = event.returnValue;
    
    if(checkBoxValue) {
      this.default = false;
      this.nameAsc = false;
      this.nameDesc = false;
      this.dateDesc = false;
    }
  }

  filterByDateDesc(event) {
    let checkBoxValue = event.returnValue;
    
    if(checkBoxValue) {
      this.default = false;
      this.nameAsc = false;
      this.nameDesc = false;
      this.dateAsc = false;
    }
  }

  async close() {
    const isDefault: Boolean = this.default;
    const isFilterNameAsc: Boolean = this.nameAsc; 
    const isFilterNameDesc: Boolean = this.nameDesc;
    const isFilterDateAsc: Boolean = this.dateAsc;
    const isFilterDateDesc: Boolean = this.dateDesc;
    let filterData = {
      "defaultFilter": isDefault,
      "nameAscFilter": isFilterNameAsc,
      "nameDescFilter": isFilterNameDesc,
      "dateAscFilter": isFilterDateAsc,
      "dateDescFilter": isFilterDateDesc
    }
    await this.popoverCtrl.dismiss(filterData);
    console.log("Filters Component Closed" +
      "\n[*] Filter default : " + isDefault +
      "\n[*] Filter name ASC : " + isFilterNameAsc +
      "\n[*] Filter name DESC : " + isFilterNameDesc +
      "\n[*] Filter date ASC : " + isFilterDateAsc +
      "\n[*] Filter date DESC : " + isFilterDateDesc);
  }

}
