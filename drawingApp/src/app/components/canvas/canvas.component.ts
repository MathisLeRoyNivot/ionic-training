import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Platform  } from '@ionic/angular';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {

  @ViewChild('canvasDragable') canvasDragable: any;

  canvasElement: any;

  constructor(
    public platform: Platform, 
    public renderer: Renderer) { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.canvasElement = this.canvasDragable.nativeElement;
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    let ctx = this.canvasElement.getContext('2d');
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    ctx.save();
  }


}
