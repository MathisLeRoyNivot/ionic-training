import { Component, OnInit } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);

  public brushSize: Number = 5;
  public currentColor: string = "#000";
  public availableColors: any;

  public redColor: Number = 0;
  public greenColor: Number = 0;
  public blueColor: Number = 0;
  public colorHex: string = "#000000";

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
    const brushColorHex: String = this.colorHex;
    let brushData = {
      "brushSize": brushSizeData,
      // "brushColor": brushColorData,
      "brushColorHex": brushColorHex
    }
    await this.popoverCtrl.dismiss(brushData);
    console.log("Settings Component Closed \n[*] Brush size : " + brushSizeData + "\n[*] Brush color : " + brushColorData + "\n[*] Brush color hex : " + brushColorHex);
  }

  // convert RGB value to hex 
  newRedValue(event) {
    this.redColor = event;
    // console.log("%cRed amount :" + this.redColor, "color:red");
    this.fullColorHex(this.redColor, this.greenColor, this.blueColor);
    return this.redColor;
  }
  newGreenValue(event) {
    this.greenColor = event;
    // console.log("%cGreen amount :" + this.greenColor, "color:green");
    this.fullColorHex(this.redColor, this.greenColor, this.blueColor);
    return this.greenColor;
  }
  newBlueValue(event) {
    this.blueColor = event;
    // console.log("%cBlue amount :" + this.blueColor, "color:blue");
    this.fullColorHex(this.redColor, this.greenColor, this.blueColor);
    return this.blueColor;
  }

  rgbToHex(colorValue) {
    let hex = Number(colorValue).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  fullColorHex(redColor, greenColor, blueColor) {   
    var red = this.rgbToHex(redColor)
    var green = this.rgbToHex(greenColor);
    var blue = this.rgbToHex(blueColor);
    this.colorHex = "#"+red+green+blue;
    return this.colorHex;
  };

  getBrushColorHex() {
    return this.colorHex;
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