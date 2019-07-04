import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-history',
  templateUrl: './filter-history.component.html',
  styleUrls: ['./filter-history.component.scss'],
})
export class FilterHistoryComponent implements OnInit {

  nameAsc: Boolean = true;
  nameDesc: Boolean = false;

  dateAsc: Boolean = false;
  dateDesc: Boolean = false;

  constructor(
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  filterByNameAsc(event) {
    let checkBoxValue = event.detail.checked;
    
    if(checkBoxValue) {
      this.nameDesc = false;
      this.dateAsc = false;
      this.dateDesc = false;
    }
  }

  filterByNameDesc(event) {
    let checkBoxValue = event.detail.checked;
    
    if(checkBoxValue) {
      this.nameAsc = false;
      this.dateAsc = false;
      this.dateDesc = false;
    }
  }

  filterByDateAsc(event) {
    let checkBoxValue = event.detail.checked;
    
    if(checkBoxValue) {
      this.nameAsc = false;
      this.nameDesc = false;
      this.dateDesc = false;
    }
  }

  filterByDateDesc(event) {
    let checkBoxValue = event.detail.checked;
    
    if(checkBoxValue) {
      this.nameAsc = false;
      this.nameDesc = false;
      this.dateAsc = false;
    }
  }

  async close() {
    const isFilterNameAsc: Boolean = this.nameAsc; 
    const isFilterNameDesc: Boolean = this.nameDesc;
    const isFilterDateAsc: Boolean = this.dateAsc;
    const isFilterDateDesc: Boolean = this.dateDesc;
    let filterData = {
      "nameAscFilter": isFilterNameAsc,
      "nameDescFilter": isFilterNameDesc,
      "dateAscFilter": isFilterDateAsc,
      "dateDescFilter": isFilterDateDesc
    }
    await this.popoverCtrl.dismiss(filterData);
    console.log("Filters Component Closed" +
      "\n[*] Filter name ASC : " + isFilterNameAsc +
      "\n[*] Filter name DESC : " + isFilterNameDesc +
      "\n[*] Filter date ASC : " + isFilterDateAsc +
      "\n[*] Filter date DESC : " + isFilterDateDesc);
  }


}
