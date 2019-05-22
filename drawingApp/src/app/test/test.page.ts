import { ViewChild, Component, OnInit, Renderer } from '@angular/core';
import { Platform, MenuController, PopoverController, ToastController, LoadingController  } from '@ionic/angular';
import { Location } from '@angular/common';
import { File } from '@ionic-native/file/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Storage } from '@ionic/storage';

import { SettingsComponent } from '../components/settings/settings.component';
import { async } from 'q';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

const STORAGE_KEY = 'IMAGE_LIST';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  @ViewChild('myCanvas') canvas: any;
  
  offsetY: number;
  canvasElement: any;
  lastX: number;
  lastY: number;
  
  displayName: boolean = false;
  name: string;

  screen: any;
  loading: any;
      
  // Set a default value for the range slider
  public brushSize: number = 5;
  // private brushSize = 5;
  
  currentColor: string = '#000';

  constructor(
    public platform: Platform, 
    public renderer: Renderer,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public location: Location,
    public screenshot: Screenshot,
    public toastCtrl: ToastController,
    public loadingCtrl:LoadingController) {
      this.canvas;
      this.name = localStorage.getItem('name');
  }
  
  ngOnInit() {}

  // --- Canvas part
  ngAfterViewInit(){
    this.canvasElement = this.canvas.nativeElement;
    this.renderer.setElementAttribute(this.canvasElement, 'height', 0.8*this.platform.height() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
  }
  
  async openPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: SettingsComponent,
      componentProps: {
        brushSize : this.brushSize,
        currentColor : this.currentColor 
      },
      event
    });
    
    popover.onDidDismiss().then((brushData) => {
      if(brushData !== null) {
        this.brushSize = brushData.data['brushSize'];
        this.currentColor = brushData.data['brushColor'];
      }
    });
    
    return await popover.present();
  }
  
  // Back button function
  backClicked() {
    this.location.back();
  }


  // First position of the line that the user draw
    handleStart(ev) {
      this.lastX = ev.touches[0].pageX;
      this.lastY = ev.touches[0].pageY - this.canvasElement.getBoundingClientRect().top;

      let ctx = this.canvasElement.getContext('2d');
      ctx.fillStyle = this.currentColor;
      ctx.beginPath();
      ctx.arc(this.lastX, this.lastY, this.brushSize/2, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      // Display starting point position
      console.log("%cStarting", "color:green");
      console.log("X : " + this.lastX + "\nY : " + this.lastY);

    }
  
  // When the user hold and move his finger accross the screen
  handleMove(ev) {
    
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY - this.canvasElement.getBoundingClientRect().top;

    // Display new point added to the line
    console.log("%cNew point added", "color: green", "\nX position : " + currentX + "\nY position : " + currentY);

    let ctx = this.canvasElement.getContext('2d');

    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = this.currentColor;
    ctx.lineWidth = this.brushSize;
    ctx.stroke();
    
    this.lastX = currentX;
    this.lastY = currentY;
    
    ctx.getImageData(0, this.canvasElement.getBoundingClientRect().top, this.canvasElement.width, this.canvasElement.height-this.canvasElement.getBoundingClientRect().top);
    ctx.save();
  }

  showSaveHide() {
    this.displayName = true;
    // this.name = localStorage.getItem('name');
    console.log("Name : " + this.name);
    return this.name;
  }

  saveCanvas() {

    this.loadingCtrl.create({ 
      message: "Saving, please wait...",
      duration: 1000
    }).then(loading => {
      loading.present();
      
      this.showSaveHide();
      let date = new Date().toISOString();
      let photoName = "draw-ismart-" + date + ".jpg";
  
      setTimeout(() => {
        loading.dismiss();
        if (this.platform.is("desktop")) {
          console.log('Desktop Detected !');
          // Code to save into desktop files
    
        } else if (this.platform.is("android")) {
          console.log('Android Detected !');
    
          this.screenshot.save('jpg', 100, photoName).then(res => {
            this.name;
            this.screen = res.filePath;
            this.displayName = false;
            this.clearCanvas();
            // console.log("Canvas have been saved into your gallery !");
    
          }, err => {
            console.log(err)
          });
    
        } else if (this.platform.is("ios")) {
          console.log('iOS Detected ! Impossible to save the drawing into the gallery.');
          // Code to save into ios files      
        }
      }, 2000)

    });
  }

  // Reset the canvas view for the user
  clearCanvas() {
    this.displayName = false
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    console.log("%cCanvas has been reset !", "color:red")
  }

}