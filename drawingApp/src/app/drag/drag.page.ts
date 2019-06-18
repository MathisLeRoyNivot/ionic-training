import { ViewChild, Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.page.html',
  styleUrls: ['./drag.page.scss'],
})
export class DragPage implements OnInit {

  @ViewChild('topContainer') topContainer: any;

  textElement: any;

  count: number = 0;

  drag: any;
  dragStart: Boolean = false;

  topTextContainer: any;
  textContentWrapper: any;
  textContent: any;

  constructor(
    public platform: Platform,
    public location: Location) {}

  ngOnInit() {}

  backClicked() {
    this.location.back();
  }

  ngAfterViewInit() {
    this.topTextContainer = document.getElementById("top-container");
    this.textContentWrapper = document.getElementById("text-content-wrapper");
    this.textContent = document.getElementById("text-content");
  }
  
  startPan(ev) {
    this.dragStart = true;
    console.log("Starting draging !\nY : " + ev.center.y);
  }
  
  endPan(ev) {
    let deviceHeight = this.platform.height();
    let topNavHeight = this.textElement.getBoundingClientRect().top;
    let minScroll = topNavHeight / deviceHeight * 100;

    let yPos = ev.center.y - 40;
    let viewRatio = yPos / deviceHeight;
    let viewHeight = viewRatio * 100;

    if(viewHeight >= minScroll && viewHeight <= 92) {
      this.topTextContainer.style.height = viewHeight + "vh";
      this.textContentWrapper.style.height = viewHeight + "vh";
      console.log("Dragable container : " + viewHeight.toFixed(3) + "%");
    } else if(viewHeight > 92) {
      this.topTextContainer.style.height = "92vh";  
    } else if(viewHeight < minScroll) {
      this.topTextContainer.style.height = minScroll + "vh";
    }

    console.log("Drag ended !\nY : " + ev.center.y);
    if(this.dragStart) {
      this.dragStart = false;
      clearInterval(this.drag);
    }
  }
  
  handlePan(ev) {
    
    ev.preventDefault();
    
    this.textElement = this.topContainer.nativeElement;
    let topNavHeight = this.textElement.getBoundingClientRect().top;
    let deviceHeight = this.platform.height();
    
    let yPos = ev.center.y - 40;
    
    let contentHeight = this.textContent.offsetHeight;
    let contentRatio = (contentHeight + 70) / deviceHeight * 100;
    
    let viewRatio = yPos / deviceHeight;
    let viewHeight = viewRatio * 100;
    let minScroll = topNavHeight / deviceHeight * 100;

    if(viewHeight >= minScroll && viewHeight <= 92) {
      this.topTextContainer.style.height = viewHeight + "vh";
      this.textContentWrapper.style.height = viewHeight + "vh";
      console.log("Dragable container : " + viewHeight.toFixed(3) + "%");
    } else if(viewHeight > 92) {
      this.topTextContainer.style.height = "92vh";  
    } else if(viewHeight < minScroll) {
      this.topTextContainer.style.height = minScroll + "vh";
    }
    
    // if(this.dragStart) {
    //   this.drag = setInterval(() => {
    //     // this.topTextContainer.style.height = viewHeight + "vh";
    //     this.textContentWrapper.style.height = viewHeight.toFixed(1) + "vh";
    //     console.log("Dragable container : " + viewHeight.toFixed(3) + "%");
    //   }, 20);
    //   clearInterval(this.drag);
    // }
  }
  
  handleDoubleTap(ev) {
    ev.preventDefault();

    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;

      } else if(this.count == 2){
        this.count = 0;
        console.log('Double Tap : Top-container height has been reset.');
        this.topTextContainer.style.height = "40vh";
        this.textContentWrapper.style.height = "40vh";
      }
    }, 250);
  }
}