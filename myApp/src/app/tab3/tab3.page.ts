import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';

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

  currentColour: string = '#1abc9c';
  brushSize: number = 10;


  constructor(public platform: Platform, public renderer: Renderer) {
    console.log('Hello CanvasDraw Component');
  }

  ngAfterViewInit(){

    this.canvasElement = this.canvas.nativeElement;

    // this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    // this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');

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
    console.log('X position : ' + currentX + '\n' + 'Y position : ' + currentY);

    let ctx = this.canvasElement.getContext('2d');

    ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = this.currentColour;
        ctx.lineWidth = this.brushSize;
        ctx.stroke();       

        this.lastX = currentX;
        this.lastY = currentY;

  }

}
