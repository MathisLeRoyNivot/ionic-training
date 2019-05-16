import { Component, OnInit } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from '../../data.service';


export class FeatureModule {}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public brushSize = 5;
  // private brushSize;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    dataService: DataService,
    public popoverCtrl: PopoverController) {
      
      this.initializeApp();
      
      this.brushSize = 5;
      // this.brushSize = dataService.brushSize;
      dataService.setOption(this.brushSize);
    }
    
  ngOnInit() {}

  async close() {
    const brushData: Number = this.brushSize; 
    await this.popoverCtrl.dismiss(brushData);
    console.log("Settings Component Closed - Brush size : " + brushData);
  }
  
  getBrushSize() {
    return this.brushSize;
  }
 
  getBrushColor() {
    return "Color here";
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
