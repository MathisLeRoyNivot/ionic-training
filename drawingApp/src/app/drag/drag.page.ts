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

  constructor(
    public platform: Platform,
    public location: Location) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    
  }

  backClicked() {
    this.location.back();
  }

  ngAfterViewInit() {}

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
    let contentHeight = document.getElementById("text-content").offsetHeight;
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
      document.getElementById("top-container").style.height= viewHeight + "vh";
      console.log("Dragable container : " + viewHeight.toFixed(3) + "%");
    } else if(viewHeight > 92) {
      document.getElementById("top-container").style.height = "92vh";  
    } else if(viewHeight < minScroll) {
      document.getElementById("top-container").style.height = minScroll + "vh";
    }
  }

  handleDoubleTap(ev) {
    ev.preventDefault();

    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;

      } else if(this.count == 2){
        // If user double tap then it reset the height to the default value
        this.count = 0;
        this.isContentBigger = true;
        this.sliderRangeScroll = 0;
        console.log('Double Tap : Top-container height has been reset.');
        document.getElementById("top-container").style.height = "40vh";
      }
    }, 250);
  }

  newScrollValue(ev) {
    let percent = ev / 100;
    // console.log(percent);

    let containerSize = document.getElementById("top-container").offsetHeight;
    // console.log("Container size : " + containerSize);

    let textContentWrapperSize = document.getElementById("text-content-wrapper").offsetHeight;
    let textContainerSize = document.getElementById("text-content").offsetHeight;
    // console.log("Text container size : " + textContainerSize);
    // let diffSize = containerSize - textContainerSize;

    let deviceHeight = this.platform.height();
    let textContainerSizeRatio = textContainerSize / deviceHeight;
    // console.log(textContainerSizeRatio);
    let newTest = textContainerSizeRatio;
    let newTest1 = percent * newTest;
    console.log(newTest1);
    // let scrollValue = textContainerSizeRatio * percent;
    let scrollableDiv = document.getElementById("text-content");
    let scrollableDiv1 = scrollableDiv.scrollHeight * percent;
    // console.log(scrollableDiv1);
    document.getElementById("text-content-wrapper").scrollTop = scrollableDiv1;    


    // scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    // console.log(scrollableDiv.scrollHeight)
    // document.getElementById("text-content-wrapper").scrollTop = newTest1;    
    // console.log(scrollValue);

  }
  
}