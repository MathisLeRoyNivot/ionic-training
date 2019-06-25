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
    const redHex: Number = this.redColor;
    const greenHex: Number = this.greenColor;
    const blueHex: Number = this.blueColor;
    const brushColorHex: String = this.colorHex;
    let brushData = {
      "brushSize": brushSizeData,
      "redHex": redHex,
      "greenHex": greenHex,
      "blueHex": blueHex,
      "brushColorHex": brushColorHex
    }
    await this.popoverCtrl.dismiss(brushData);
    console.log("Settings Component Closed" +
              "\n[*] Brush size : " + brushSizeData +
              "\n[*] Brush color hex : " + brushColorHex +
              "\n[*] Red amount : " + redHex +
              "\n[*] Green amount : " + greenHex +
              "\n[*] Blue amount : " + blueHex);
  }

  newBrushValue(event) {
    this.brushSize = event
    console.log("%cNew brush size : ", "color: green", + this.brushSize);
    return this.brushSize; // mymodel has the value before the change
  }

  getBrushSize() {
    return this.brushSize;
  }

  changeColor() {
    console.log(`%cNew brush color : ${this.colorHex}`, `color: ${this.colorHex}`);
    return this.colorHex;
  }
  
  getBrushColor() {
    return this.colorHex;
  }
  
  newRedValue(event) {
    var red = this.rgbToHex(event);
    red = "#" + red + "0000";
    document.getElementById("red-amount").style.backgroundImage = `-webkit-linear-gradient(0deg, ${red} 0%,${red} ${(event/255)*100}%, #d1d8e0 ${(event/255)*100}%)`;
    
    this.redColor = event;
    this.fullColorHex(this.redColor, this.greenColor, this.blueColor);
    return this.redColor;
  }
  newGreenValue(event) {
    var green = this.rgbToHex(event);
    green = "#00" + green + "00";
    document.getElementById("green-amount").style.backgroundImage = `linear-gradient(90deg, ${green} 0%, ${green} ${(event/255)*100}%, #d1d8e0 ${(event/255)*100}%)`;

    this.greenColor = event;
    this.fullColorHex(this.redColor, this.greenColor, this.blueColor);
    return this.greenColor;
  }
  newBlueValue(event) {
    var blue = this.rgbToHex(event);
    blue = "#0000" + blue;
    document.getElementById("blue-amount").style.backgroundImage = `linear-gradient(90deg, ${blue} 0%, ${blue} ${(event/255)*100}%, #d1d8e0 ${(event/255)*100}%)`;

    this.blueColor = event;
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
    this.colorHex = "#" + red + green + blue;
    return this.colorHex;
  };

  getBrushColorHex() {
    return this.colorHex;
  }
    
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkDevice();
    });
  }

}