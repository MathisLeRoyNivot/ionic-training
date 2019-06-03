import { ViewChild, Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { Hammer } from 'hammerjs';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.page.html',
  styleUrls: ['./drag.page.scss'],
})
export class DragPage implements OnInit {

  @ViewChild('topContainer') topContainer: any;
  @ViewChild('canvasDragable') canvasDragable: any;

  textElement: any;
  canvasElement: any;

  constructor(
    public platform: Platform,
    public location: Location) { }

  ngOnInit() {
  }

  backClicked() {
    this.location.back();
  }

  ngAfterViewInit(){
    this.canvasElement = this.canvasDragable.nativeElement;
    let ctx = this.canvasElement.getContext('2d');

    for (var i = 0; i < 6; i++){
      for (var j = 0; j < 6; j++){
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
                         Math.floor(255 - 42.5 * j) + ',0)';
        ctx.fillRect(j * 25, i * 25, 25, 25);
      }
    }
  }

  handlePan(ev) {
    this.textElement = this.topContainer.nativeElement;
    let topNavHeight = this.textElement.getBoundingClientRect().top;
    let deviceHeight = this.platform.height();

    let xyPos = ev.center;
    let xPos = ev.center.x;
    let yPos = ev.center.y - 50;

    // let viewHeight = deviceHeight - topNavHeight;
    let viewRatio = yPos/deviceHeight;
    let viewHeight = viewRatio * 100;
    let minScroll = topNavHeight/deviceHeight * 100;

    if(viewHeight >= minScroll && viewHeight <= 92) {
      console.log(yPos);
      console.log("View Height :" + viewHeight + "%");
      document.getElementById("top-container").style.height= viewHeight + "vh";
    } else if(viewHeight > 92) {
      document.getElementById("top-container").style.height= "92vh";      
    } else if(viewHeight < minScroll) {
      document.getElementById("top-container").style.height= minScroll + "vh";
    }

    
  }

}