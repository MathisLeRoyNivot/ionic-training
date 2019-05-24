import { ViewChild, Component, OnInit, Renderer } from '@angular/core';
import { Platform, MenuController, PopoverController, ToastController, LoadingController  } from '@ionic/angular';
import { Location } from '@angular/common';
import { Screenshot } from '@ionic-native/screenshot/ngx';

import { SettingsComponent } from '../components/settings/settings.component';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

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

  constructor(
    public platform: Platform, 
    public renderer: Renderer,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public location: Location,
    public screenshot: Screenshot,
    public toastCtrl: ToastController,
    public loadingCtrl:LoadingController,
    private router: Router,
    private file: File,
    private b64toGallery: Base64ToGallery) {
      this.canvas;
      this.name = localStorage.getItem('name');
  }
  
  ngOnInit() {
  }
  
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
    let ctx = this.canvasElement.getContext('2d');
    ctx.fillStyle = "Black";
    ctx.font = "bold 16px Arial";
    ctx.fillText(this.name, (this.canvasElement.width - 70), (this.canvasElement.height - 50));
    ctx.getImageData(0, this.canvasElement.getBoundingClientRect().top, this.canvasElement.width, this.canvasElement.height-this.canvasElement.getBoundingClientRect().top);
    ctx.save();
    // this.displayName = true;
    // // this.name = localStorage.getItem('name');
    // console.log("Name : " + this.name);
    // return this.name;
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

      // let path = this.file.dataDirectory;
      // console.log(path);
      // var data = dataUrl.split(',')[1];
      // // console.log(data);
      // let blob = this.b64toBlob(data, 'image/jpeg');
      // this.file.writeFile(filePath, photoName, blob).then((res) => {  
      //   console.log("File Writed Successfully", res);  
      //   this.clearCanvas();
      // }).catch((err) => {  
      //     console.log("Error Occured While Writing File", err);  
      // })  
      // console.log(blob);

      // this.file.writeFile(path, photoName, blob).then(res => {
      //   console.log("image saved")
      // }, err => {
      //   console.log('error: ', err);
      // });
  
      // setTimeout(() => {
      //   loading.dismiss();
      //   if (this.platform.is("desktop") || this.platform.is("ios")) {
      //     console.log('Desktop Detected !');
      //     // Code to save into desktop files
    
      //   } else if (this.platform.is("android")) {
      //     console.log('Android Detected !');
    
      //     this.screenshot.save('jpg', 100, photoName).then(res => {
      //       this.name;
      //       this.screen = res.filePath;
      //       this.displayName = false;
      //       this.clearCanvas();
      //       // console.log("Canvas have been saved into your gallery !");
      //     }, err => {
      //       console.log(err)
      //     });
      //   }
      // }, 2000)

    });
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
   
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
   
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
   
      var byteArray = new Uint8Array(byteNumbers);
   
      byteArrays.push(byteArray);
    }
   
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
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