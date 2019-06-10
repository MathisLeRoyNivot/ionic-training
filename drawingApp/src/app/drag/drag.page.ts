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

  count: number = 0;

  constructor(
    public platform: Platform,
    public location: Location) {}

  ngOnInit() {
  }

  backClicked() {
    this.location.back();
  }

  ngAfterViewInit(){
    this.canvasElement = this.canvasDragable.nativeElement;
    let ctx = this.canvasElement.getContext('2d');

  }

  handlePan(ev) {

    ev.preventDefault();

    this.textElement = this.topContainer.nativeElement;
    let topNavHeight = this.textElement.getBoundingClientRect().top;
    let deviceHeight = this.platform.height();

    // Get position coordinates
    let xyPos = ev.center;
    let xPos = ev.center.x;
    let yPos = ev.center.y - 40;

    // Size of the text content
    let contentHeight = document.getElementById("text-content").offsetHeight;
    let contentRatio = (contentHeight + 70) / deviceHeight * 100;

    // Total device view size
    let viewRatio = yPos / deviceHeight;
    let viewHeight = viewRatio * 100;
    let minScroll = topNavHeight / deviceHeight * 100;

    if(viewHeight >= minScroll && viewHeight <= 92) {
      // if(contentRatio <= 40) {
      //   document.getElementById("top-container").style.height = viewHeight + "vh";
      //   document.getElementById("top-container").style.maxHeight = "40vh";
      // } else if(contentRatio > 40) {
        document.getElementById("top-container").style.height= viewHeight + "vh";
      // }
    } else if(viewHeight > 92) {
      document.getElementById("top-container").style.height = "92vh";  
    } else if(viewHeight < minScroll) {
      document.getElementById("top-container").style.height = minScroll + "vh";
    }
  }

  handleDoubleTap(ev) {
    // ev.preventDefault();
    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;
        console.log('Single Tap');

      } else if(this.count > 1){
        // If user double tap then it reset to the default value, the height
        this.count = 0;
        console.log('Double Tap : Top-container height has been reset.');
        document.getElementById("top-container").style.height = "40vh";

      } 
    }, 250);
  }

  onScroll(ev) {
    console.log("%cPage scrolled", "color: #00BEBE");
  }

}