import { ViewChild, Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Location } from "@angular/common";

@Component({
    selector: "app-drag",
    templateUrl: "./drag.page.html",
    styleUrls: ["./drag.page.scss"]
})
export class DragPage implements OnInit {
    @ViewChild("topContainer") topContainer: any;
    topContainerElement: any;

    count: number = 0;

    drag: any;
    dragStart: Boolean = false;

    topTextContainer: any;
    textContentWrapper: any;
    textContent: any;

    constructor(
        public platform: Platform, 
        public location: Location) {
            
        }

    ngOnInit() { }

    backClicked() {
        // Return in the previous page
        this.location.back();
    }

    ngAfterViewInit() {
        this.topTextContainer = document.getElementById("top-container");
        this.textContentWrapper = document.getElementById("text-content-wrapper");
        this.textContent = document.getElementById("text-content");
    }

    startPan(ev) {
        this.dragStart = true;
        console.log("%cStarting draging !\nY : " + ev.center.y, "color: #6ab04c");
    }

    endPan(ev) {
        this.dragStart = false;
        this.heightChecker(ev);
        console.log("%cDrag ended !\nY : " + ev.center.y, "color: #eb2f06");
    }

    handlePan(ev) {
        ev.preventDefault();
        this.heightChecker(ev);
    }

    heightChecker(ev) {
        this.topContainerElement = this.topContainer.nativeElement;
        // Get the height of the top header nav (in px)
        let topNavHeight = this.topContainerElement.getBoundingClientRect().top;
        // Get the total height of the device (in px)
        let deviceHeight = this.platform.height();
        // Calculation of top header nav proportion of total height (in percentage %) to define the limit the height of the dragable div
        let minScroll = (topNavHeight / deviceHeight) * 100;
        // viewHeight define the proportion of the dragable container height

        let viewHeight = ((ev.center.y - 40) / deviceHeight) * 100;

        // If the dragable container height is between the minscroll and the max value fixed to 92 (92vh)
        if (viewHeight >= minScroll && viewHeight <= 92) {
            this.topTextContainer.style.height = viewHeight + "vh";
            this.textContentWrapper.style.height = viewHeight + "vh";
            console.log("Dragable container : " + viewHeight.toFixed(3) + "%");
        } else if (viewHeight > 92) {
            // If the viewHeight exceed 92vh, the viewHeight value is defined to a fixed value : 92vh 
            this.topTextContainer.style.height = "92vh";
        } else if (viewHeight < minScroll) {
            // If the viewHieght is inferior of the minScroll variable, the viewHeight value is defined to a fixed minScroll variable value
            this.topTextContainer.style.height = minScroll + "vh";
        }
    }

    handleDoubleTap(ev) {
        ev.preventDefault();
        // Eeach click, count variable increase by 1
        this.count++;
        setTimeout(() => {
            if (this.count == 1) {
                this.count = 0;
            } else if (this.count == 2) {
                // If the user made a double click, then reset the height of the dragable container (here reset to 40vh)
                this.count = 0;
                console.log("Double Tap : Top-container height has been reset.");
                this.topTextContainer.style.height = "40vh";
                this.textContentWrapper.style.height = "40vh";
            }
        }, 250);
    }
}