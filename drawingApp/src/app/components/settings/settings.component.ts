import { Component, OnInit } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  public brushSize: Number = 5;
  public currentColor: string = '#1abc9c';
  public availableColors: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public popoverCtrl: PopoverController) {
    
    this.initializeApp();
    this.brushSize = 5;
    this.availableColors = [
      '#1abc9c',
      '#3498db',
      '#9b59b6',
      '#e67e22',
      '#e74c3c'
    ];
  
  }

  ngOnInit() {}

  async close() {
    const brushSizeData: Number = this.brushSize; 
    const brushColorData: String = this.currentColor;
    let brushData = {
      "brushSize": brushSizeData,
      "brushColor": brushColorData
    }
    await this.popoverCtrl.dismiss(brushData);
    console.log("Settings Component Closed \n[*] Brush size : " + brushSizeData + "\n[*] Brush color : " + brushColorData);
  }

  changeColor(color) {
    this.currentColor = color;
    console.log(`%cNew brush color : ${this.currentColor}`, `color: ${this.currentColor}`);
    return this.currentColor;
  }
  
  getBrushSize() {
    return this.brushSize;
  }
 
  getBrushColor() {
    return this.currentColor;
  }

  newBrushValue(event) {
    this.brushSize = event
    console.log("%cNew brush size : ", "color: green", + this.brushSize);
    return this.brushSize; // mymodel has the value before the change
  }
    
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
