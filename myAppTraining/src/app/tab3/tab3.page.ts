import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('myCanvas') canvas: any;

  canvasElement: any;
  lastX: number;
  lastY: number;
  
  currentImage: any;

  

  brushOnBlur(brushSize: any) {
    let newBrushSize = brushSize.value;
    console.log("%cNew brush size : ", "color: green", + newBrushSize);
  }
  currentColor: string = '#000';


  constructor(
    public platform: Platform, 
    public renderer: Renderer,
    private actRoute: ActivatedRoute,
    public popoverController: PopoverController,
    private camera: Camera) {}

  ngAfterViewInit(){

    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');

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

  // takePicture() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     this.currentImage = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //    // Handle error
  //    console.log("Camera issue:" + err);
  //   });
  // }

}
