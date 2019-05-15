import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  brushSize: number;  
  brushSizeChange: Subject<number> = new Subject<number>()
  
  constructor() {}

  setOption(value) {      
    this.brushSize = value;
  }  
  
  getOption() {  
    console.log("Data Service - Brush size : " + this.brushSize);
    return this.brushSize;  
  }

}