import { Component, OnInit } from '@angular/core';
import { ViewChild, Renderer } from '@angular/core';
import { Platform, MenuController, PopoverController  } from '@ionic/angular';
import { File  } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


import { SettingsComponent } from '../components/settings/settings.component';
import { Content } from '@angular/compiler/src/render3/r3_ast';

const STORAGE_KEY = 'IMAGE_LIST';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.page.html',
  styleUrls: ['./draw.page.scss'],
})
export class DrawPage implements OnInit {

  
  @ViewChild('myCanvas') canvas: any;
  
  canvasElement: any;
  name: string;
  lastX: number;
  lastY: number;
  
  // @ViewChild(Content) content: Content;
  // @ViewChild('fixedContainer') fixedContainer: any; 
  
  currentImage: any;
  storedImages = [];
  
  // Set a default value for the range slider
  public brushSize;
  // private brushSize = 5;
  
  currentColor: string = '#000';
  
  constructor(
    public platform: Platform, 
    public renderer: Renderer,
    public menuCtrl: MenuController,
    // private camera: Camera,
    public popoverCtrl: PopoverController,
    // private file: File,
    private storage: Storage
  ) {
    this.storage.ready().then(() => {
      this.storage.get(STORAGE_KEY).then(data => {
        if(data !== undefined) {
          this.storedImages = data;
        }
      })
    })
           
    // this.brushSize = dataService.toggleBrushSize();
    // this.brushSize = appComponent.newBrushValue(event);
    // this.brushSize = dataService.getOption();
    console.log("%cDraw Page - Brush size : ", "color: green", + this.brushSize);
  }
          
  ngOnInit() {}
  
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

  // ionViewDidEnter() {
  //   let itemHeight = this.fixedContainer.nativeElement.offsetHeight;
  //   let scroll = this.content.getScrollElement();

  //   itemHeight = Number.parseFloat(scroll.style.margin.replace("px", "")) + itemHeight;
  //   scroll.style.marginTop = itemHeight + "px";
  // }

  // --- Canvas part
  ngAfterViewInit(){
    this.canvasElement = this.canvas.nativeElement;
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', 0.50*this.platform.height() + '');
    
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
    console.log("Canvas has been saved !")
    // Here code to save the canvas to the phone gallery
    // let dataUrl = this.canvasElement.toDataURL();

    // let ctx = this.canvasElement.getContext('2d');
    // ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    // let fileName = new Date().getTime() + '.png';
    // let path = this.file.dataDirectory;

    // let data = dataUrl.split(',')[1];
    // let blob = this.b64toBlob(data, 'image/png');
    // this.file.writeFile(path, fileName, blob).then(res => {
    //   this.storeImage(fileName);
    // }, err => {
    //   console.log('err : ', err);
    // }); 
  }

  // storeImage(imageName) {
  //   let saveObj = { img : imageName};
  //   this.storedImages.push(saveObj);
  //   this.storage.set(STORAGE_KEY, this.storedImages).then(() => {
  //     setTimeout(() => {
  //       console.log("Test storeImage")
  //       // this.content.scrollToBottom;
  //     }, 500);
  //   });
  // }

  // removeImageAtIndex(index) {
  //   let removed = this.storedImages.splice(index, 1);
  //   this.file.removeFile(this.file.dataDirectory, removed[0].img).then(res => {
  //     console.log('Image removed')
  //   }, err => {
  //     console.log('Remove err : ' + err);
  //   });
  //   this.storage.set(STORAGE_KEY, this.storedImages)
  // }

  // getImagePath(imageName) {
  //   let path = this.file.dataDirectory + imageName;
  //   path = normalizeURL(path);

  //   return path;
  // }


  // b64toBlob(b64Data, contentType) {
  //   contentType = contentType ||'';
  //   let sliceSize = 512;
  //   let byteCharacters = atob(b64Data);
  //   let byteArrays = [];

  //   for(let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     let slice = byteCharacters.slice(offset, offset + sliceSize);

  //     let byteNumbers = new Array(slice.length);
  //     for(let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }

  //     let byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }

  //   let blob = new Blob(byteArrays, { type: contentType});
  //   return blob;
  // }

  // Reset the canvas view for the user
  clearCanvas() {
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    console.log("%cCanvas has been reset !", "color:red")
  }

  // takePicture() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }

  //     this.camera.getPicture(options).then((imageData) => {
  //     this.currentImage = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //    // Handle error
  //    console.log("Camera issue:" + err);
  //   });
  // }

}
