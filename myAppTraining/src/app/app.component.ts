import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  // template: `
  // <ion-app>
  //   <ion-menu contentId="settings" side="end">
  //     <ion-header>
  //       <ion-toolbar>
  //         <ion-title>Settings</ion-title>
  //       </ion-toolbar>
  //     </ion-header>
  //     <ion-content>
  //       <ion-item>
  //         <p>Brush size : {{ this.brushSize }}</p>
  //       </ion-item>
  //       <ion-item>
  //         <ion-range min="1" max="20" pin="true" [(ngModel)]="brushSize" (ngModelChange)="newBrushValue($event)" color="pirmary">
  //           <ion-icon size="small" slot="start" name="brush"></ion-icon>
  //             <ion-icon slot="end" name="brush"></ion-icon>
  //           </ion-range>
  //         </ion-item>

  //         <ion-item>
  //         <p>Brush color : </p>
  //       </ion-item>
  //       </ion-content>
  //   </ion-menu>
  //   <ion-router-outlet id="settings" main></ion-router-outlet>
  // </ion-app>`
})  
export class AppComponent {

  // public brushSize = 5;
  // // private brushSize;

  constructor() {}
  // constructor(
  //   private platform: Platform,
  //   private splashScreen: SplashScreen,
  //   private statusBar: StatusBar,
  //   dataService: DataService) {
      
  //     this.initializeApp();
      
  //     // this.newBrushValue(event);
  //     this.brushSize = 5;
  //     // this.brushSize = dataService.brushSize;
  //     dataService.setOption(this.brushSize);
  //   }
    
  // getBrushSize() {
  //   return this.brushSize;
  // }
 
  // newBrushValue(event) {
  //   this.brushSize = event
  //   console.log("%cNew brush size : ", "color: green", + this.brushSize);
  //   return this.brushSize; // mymodel has the value before the change
  // }

    
  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }
}