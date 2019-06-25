import { ViewChild, Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController, PopoverController, ToastController, LoadingController  } from '@ionic/angular';
import { Location } from '@angular/common';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { SettingsComponent } from '../components/settings/settings.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage {

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
  redHexColor: Number = 0;
  greenHexColor: Number = 0;
  blueHexColor: Number = 0;

  constructor(
    public platform: Platform, 
    public renderer: Renderer,
    public router: Router,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public location: Location,
    public toastCtrl: ToastController,
    public loadingCtrl:LoadingController,
    private b64toGallery: Base64ToGallery) {
      this.canvas;
      this.name = localStorage.getItem('name');
  }
  
  ngOnInit() {}
  
  // --- Canvas part
  ngAfterViewInit(){
    this.canvasElement = this.canvas.nativeElement;
    this.renderer.setElementAttribute(this.canvasElement, 'height', 0.8*this.platform.height() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    let ctx = this.canvasElement.getContext('2d');
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    ctx.save();
  }
  
  async openPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: SettingsComponent,
      componentProps: {
        brushSize : this.brushSize,
        currentColor : this.currentColor,
        redHexColor: this.redHexColor,
        greenHexColor: this.greenHexColor,
        blueHexColor: this.blueHexColor
      },
      event
    });
    
    popover.onDidDismiss().then((brushData) => {
      if(brushData !== null) {
        this.brushSize = brushData.data['brushSize'];
        // this.currentColor = brushData.data['brushColor'];
        this.currentColor = brushData.data['brushColorHex'];
        this.redHexColor = brushData.data['redHex'];
        this.greenHexColor = brushData.data['greenHex'];
        this.blueHexColor = brushData.data['blueHex'];
      }
    });
    
    return await popover.present();
  }

  newPageCanvas() {
    this.router.navigate(['/drag']);
  }
  
  // Back button function
  backClicked() {
    this.location.back();
  }


  // First position of the line that the user draw
  handleStart(ev) {
    ev.preventDefault();
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
    console.log("Red : " + this.redHexColor + "\nGreen : " + this.greenHexColor + "\nBlue : " + this.blueHexColor);
  }
  
  // When the user hold and move his finger accross the screen
  handleMove(ev) {
    ev.preventDefault();
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
    let ctx = this.canvasElement.getContext('2d');
    ctx.fillStyle = "Black";
    ctx.font = "bold 16px Arial";
    ctx.fillText(this.name, (this.canvasElement.width - 70), (this.canvasElement.height - 50));
    ctx.getImageData(0, this.canvasElement.getBoundingClientRect().top, this.canvasElement.width, this.canvasElement.height-this.canvasElement.getBoundingClientRect().top);
    ctx.save();
  }

  saveCanvas() {

    this.loadingCtrl.create({ 
      message: "Saving, please wait...",
      duration: 2000
    }).then(loading => {
      loading.present();
      
      this.showSaveHide();

      let dataUrl = this.canvasElement.toDataURL();
      console.log(dataUrl);
      let data = dataUrl.split(',')[1];
      let dataUrlJpg = 'data:image/jpeg;base64,'+data;
      console.log(dataUrlJpg);

      // Photo file name
      let date = new Date().toISOString();
      
      this.b64toGallery.base64ToGallery(dataUrl).then(
        res => {
          setTimeout(() => {
            console.log("Image saved into your gallery : ", res);
            this.clearCanvas();
            loading.dismiss();
          }, 1000)
        },
        err => console.error("Error while saving image : ", err),
      )
    });
  }

  // Reset the canvas view for the user
  clearCanvas() {
    this.displayName = false
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    console.log("%cCanvas has been reset !", "color:red")
  }

}