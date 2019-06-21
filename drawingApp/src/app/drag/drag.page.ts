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

    textElement: any;

    count: number = 0;

    drag: any;
    dragStart: Boolean = false;

    topTextContainer: any;
    textContentWrapper: any;
    textContent: any;

    constructor(public platform: Platform, public location: Location) { }

    ngOnInit() { }

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
        console.log("%cStarting draging !\nY : " + ev.center.y, "color: #6ab04c");
    }

    endPan(ev) {

        // this.dragStart = false;
        if(this.drag) {
            let i = 0;
            for(i; i <= this.drag; i++) {
                clearInterval(i);
            }
        }
        console.log("%cDrag interval ID : " + this.drag, "color: #bebe00");
        console.log("%cDrag ended !\nY : " + ev.center.y, "color: #eb2f06");

        let deviceHeight = this.platform.height();
        let topNavHeight = this.textElement.getBoundingClientRect().top;
        let minScroll = (topNavHeight / deviceHeight) * 100;

        let yPos = ev.center.y - 40;
        let viewRatio = yPos / deviceHeight;
        let viewHeight = viewRatio * 100;

        if (viewHeight >= minScroll && viewHeight <= 92) {
            this.topTextContainer.style.height = viewHeight + "vh";
            this.textContentWrapper.style.height = viewHeight + "vh";
        } else if (viewHeight > 92) {
            this.topTextContainer.style.height = "92vh";
        } else if (viewHeight < minScroll) {
            this.topTextContainer.style.height = minScroll + "vh";
        }
    }

    handlePan(ev) {
        ev.preventDefault();

        this.textElement = this.topContainer.nativeElement;
        let topNavHeight = this.textElement.getBoundingClientRect().top;
        let deviceHeight = this.platform.height();

        let yPos = ev.center.y - 40;

        let contentHeight = this.textContent.offsetHeight;
        let contentRatio = ((contentHeight + 70) / deviceHeight) * 100;

        let viewRatio = yPos / deviceHeight;
        let viewHeight = viewRatio * 100;
        let minScroll = (topNavHeight / deviceHeight) * 100;

        
        if (viewHeight >= minScroll && viewHeight <= 92) {
            // this.topTextContainer.style.height = viewHeight + "vh";
            // this.textContentWrapper.style.height = viewHeight + "vh";
            // console.log("Dragable container : " + viewHeight.toFixed(3) + "%");
        } else if (viewHeight > 92) {
            this.topTextContainer.style.height = "92vh";
        } else if (viewHeight < minScroll) {
            this.topTextContainer.style.height = minScroll + "vh";
        }

        this.drag = setInterval(() => {
            // this.topTextContainer.style.height = viewHeight + "vh";
            this.textContentWrapper.style.height = viewHeight + "vh";
            console.log("Dragable container : " + viewHeight.toFixed(3) + "%");
            console.log(this.drag);
        }, 5);

    }

    handleDoubleTap(ev) {
        ev.preventDefault();

        this.count++;
        setTimeout(() => {
            if (this.count == 1) {
                this.count = 0;
            } else if (this.count == 2) {
                this.count = 0;
                console.log("Double Tap : Top-container height has been reset.");
                this.topTextContainer.style.height = "40vh";
                this.textContentWrapper.style.height = "40vh";
            }
        }, 250);
    }
}