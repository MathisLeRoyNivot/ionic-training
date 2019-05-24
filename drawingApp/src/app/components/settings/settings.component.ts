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
  public currentColor: string = '#000';
  public availableColors: any;

  isAndroid = false;
  isIosDesktop = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public popoverCtrl: PopoverController) {
    
    this.initializeApp();
    this.brushSize = 5;
    this.availableColors = [
      '#000000', // Black
      '#1e3799', // Blue 1
      '#5f27cd', // Purple 1
      '#009432', // Green 1
      '#e74c3c', // Red
      '#576574', // Grey
      '#54a0ff', // Blue 2
      '#D980FA', // Pink
      '#78e08f', // Green 2
      '#ff9f43' // Orange
    ];
  }

  ngOnInit() {}

  checkDevice() {
    if (this.platform.is('android')) {
      this.isAndroid = true;
    } else if (this.platform.is('ios') || this.platform.is('desktop')) {
      this.isIosDesktop = true;
    }
  }
    
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
      this.checkDevice();
    });
  }

}
