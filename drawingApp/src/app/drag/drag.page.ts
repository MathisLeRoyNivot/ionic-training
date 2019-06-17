import { ViewChild, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { Hammer } from 'hammerjs';
import { container } from '@angular/core/src/render3';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.page.html',
  styleUrls: ['./drag.page.scss'],
})
export class DragPage implements OnInit {

  @ViewChild('topContainer') topContainer: any;

  @Output() drag: EventEmitter<any> = new EventEmitter<any>();

  textElement: any;

  count: number = 0;

  isContentBigger: Boolean = false;
  sliderRangeScroll: number = 0;

  textContainer: any;
  textContentWrapper: any;
  textContent: any;

  constructor(
    public platform: Platform,
    public location: Location) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    
  }

  backClicked() {
    this.location.back();
  }

  ngAfterViewInit() {
    this.textContainer = document.getElementById("top-container");
    this.textContentWrapper = document.getElementById("text-content-wrapper");
    this.textContent = document.getElementById("text-content");
  }

  onClick() {
    this.drag.emit(5);
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
    let contentHeight = this.textContent.offsetHeight;
    let contentRatio = (contentHeight + 70) / deviceHeight * 100;

    // Total device view size
    let viewRatio = yPos / deviceHeight;
    let viewHeight = viewRatio * 100;
    let minScroll = topNavHeight / deviceHeight * 100;

    if(contentRatio >= viewHeight) {
      this.isContentBigger = true;
      this.sliderRangeScroll = 0;
    } else if(contentRatio < viewHeight) {
      this.isContentBigger = false;
    }

    if(viewHeight >= minScroll && viewHeight <= 92) {
      this.textContainer.style.height = viewHeight + "vh";
      // this.textContentWrapper.style.height= "calc("+ viewHeight + "vh - 2em)";
      this.textContentWrapper.style.height = viewHeight + "vh";

      // this.textContent.style.height = viewHeight + "vh";

      console.log("Dragable container : " + viewHeight.toFixed(3) + "%");
    } else if(viewHeight > 92) {
      this.textContainer.style.height = "92vh";  
    } else if(viewHeight < minScroll) {
      this.textContainer.style.height = minScroll + "vh";
    }
  }

  handleDoubleTap(ev) {
    ev.preventDefault();

    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;

      } else if(this.count == 2){
        // If user double tap then it reset the height to the default value of $0vh
        this.count = 0;
        this.isContentBigger = true;
        this.sliderRangeScroll = 0;
        console.log('Double Tap : Top-container height has been reset.');
        this.textContainer.style.height = "40vh";
        this.textContentWrapper.style.height = "40vh";
        this.textContent.style.height = "40vh";
      }
    }, 250);
  }

  // newScrollValue(ev) {
    
  //   let percent = ev / 100;

  //   let scrollableDiv = this.textContent
  //   let topContainerSize = this.textContainer.offsetHeight;
    
  //   let diffSize = scrollableDiv.scrollHeight - topContainerSize;
  //   let diffSizeRatio = diffSize * percent + percent * 65;
  //   console.log(diffSizeRatio);
  //   document.getElementById("text-content-wrapper").scrollTop = diffSizeRatio;   

  // }
  
}