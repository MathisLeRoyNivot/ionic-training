import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform, MenuController  } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute, ChildActivationEnd } from '@angular/router';
import { AppComponent } from '../app.component';
import { DataService } from '../data.service';
import { getName } from 'ionicons/dist/types/icon/utils';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('myCanvas') canvas: any;

  canvasElement: any;
  name: string;
  lastX: number;
  lastY: number;
  
  currentImage: any;

  // Set a default value for the range slider
  public brushSize;
  // private brushSize = 5;

  currentColor: string = '#000';

  constructor(
    // private actRoute: ActivatedRoute,
    public platform: Platform, 
    public renderer: Renderer,
    public menuCtrl: MenuController,
    private camera: Camera,
    dataService: DataService) {
      // debugger;  
      // this.brushSize = dataService.toggleBrushSize();
      this.brushSize = dataService.getOption();
      console.log("%cDraw Page - Brush size : ", "color: green", + this.brushSize);
    }

  // --- Canvas part
  ngAfterViewInit(){
    this.canvasElement = this.canvas.nativeElement;
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', 0.80*this.platform.height() + '');
    
    this.name = localStorage.getItem('name');
    console.log("Name : " + this.name);
    return this.name
  }

  // First position of the line that the user draw
  handleStart(ev) {
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
    console.log("%cStarting", "color:green");
  }

  // When the user hold and move his finger accross the screen
  handleMove(ev) {
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;
    console.log('%cNew point added',"color: green", '\nX position : ' + currentX + '\n' + 'Y position : ' + currentY);

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
  }

  saveCanvas() {
    // Here code to save the canvas to the phone gallery
    console.log("Canvas has been saved !")
  }

  // Reset the canvas view for the user
  clearCanvas() {
    this.ngAfterViewInit();
    console.log("%cCanvas has been reset !", "color:red")
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

      this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log("Camera issue:" + err);
    });
  }

}