import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings/settings.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  brushSize: number;  
  brushSizeChange: Subject<number> = new Subject<number>()
  
  constructor() {}

  setOption(value) {      
    this.brushSize = value;
    console.log("Brush size SET : " + this.brushSize);
  }  
  
  getOption() {  
    console.log("Data Service - Brush size : " + this.brushSize);
    return this.brushSize;  
  }

}
