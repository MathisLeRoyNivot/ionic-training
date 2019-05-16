import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform, MenuController, PopoverController  } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DataService } from '../data.service';
import { SettingsComponent } from '../components/settings/settings.component';

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
    dataService: DataService,
    public popoverCtrl: PopoverController) {
      // debugger;  
      // this.brushSize = dataService.toggleBrushSize();
      // this.brushSize = appComponent.newBrushValue(event);
      this.brushSize = dataService.getOption();
      console.log("%cDraw Page - Brush size : ", "color: green", + this.brushSize);
    }

  // Open Settings Popover
  async openPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: SettingsComponent,
      componentProps: {"brushSize" : this.brushSize},
      event
    });

    popover.onDidDismiss().then((brushSize) => {
      if(brushSize !== null) {
        this.brushSize = brushSize.data;
      }
    })
    return await popover.present();
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
    
    // ctx.save();

    this.lastX = currentX;
    this.lastY = currentY;
  }

  saveCanvas() {
    // Here code to save the canvas to the phone gallery
    console.log("Canvas has been saved !")
  }

  // Reset the canvas view for the user
  clearCanvas() {
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
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