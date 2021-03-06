import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { MenuController, PopoverController } from '@ionic/angular';
import { NewsPage } from '../news/news.page';
import { FilterHistoryComponent } from '../components/filter-history/filter-history.component';

@Component({
  selector: "app-article-history",
  templateUrl: "./article-history.page.html",
  styleUrls: ["./article-history.page.scss"]
})
export class ArticleHistoryPage implements OnInit {

  articlesHistory: any = [];

  filters: string = "default";

  isDefault: Boolean = false;
  isFilterNameAsc: Boolean = false;
  isFilterNameDesc: Boolean = false;
  // isFilterDateAsc: Boolean = false;
  // isFilterDateDesc: Boolean = false;

  constructor(
    public router: Router, 
    public alertController: AlertController,
    private newsPage: NewsPage,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController) {}

  ngOnInit() {
    this.articlesHistory = JSON.parse(localStorage.getItem("history"));
    this.articlesHistory = this.articlesHistory["articles"];
    this.articlesHistory = this.articlesHistory.slice().reverse();
  }

  async openPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: FilterHistoryComponent,
      componentProps: {},
      event
    });
    
    popover.onDidDismiss().then((filterData) => {
      if(filterData !== null) {
        // Recover and attributes the data from the filters component
        this.isDefault = filterData.data['defaultFilter'];
        this.isFilterNameAsc = filterData.data['nameAscFilter'];
        this.isFilterNameDesc = filterData.data['nameDescFilter'];
        // this.isFilterDateAsc = filterData.data['dateAscFilter'];
        // this.isFilterDateDesc = filterData.data['dateDescFilter'];
      }
      this.filter();
    });

    return await popover.present();
  }

  change(event) {
    let filterChoose = event.detail.value;

    if(filterChoose === "default") {
      this.ngOnInit();
    } else if(filterChoose === "nameAsc") {
      this.articlesHistory.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    } else if(filterChoose === "nameDesc") {
      this.articlesHistory.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)).reverse();
    }
  }

  clearHistory() {
    // // localStorage.clear();
    localStorage.removeItem("history");
    this.router.navigate(["/news"]);
  }

  filter() {
    if(this.isDefault) {
      this.ngOnInit();
    } else if(this.isFilterNameAsc) {
      this.sortByName();
    } else if(this.isFilterNameDesc) {
      this.sortByName();
    } 
    // else if(this.isFilterDateAsc) {
    //   this.sortByDate();
    // } else if(this.isFilterDateDesc) {
    //   this.sortByDate();
    // }
  }

  sortByName() {
    if(this.isFilterNameAsc) {
      this.articlesHistory.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      console.log(this.articlesHistory);
    } else if(this.isFilterNameDesc) {
      this.articlesHistory.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)).reverse();
    }
  }

  // sortByDate() {
  //   if(this.isFilterDateAsc) {
  //     console.log("Date ASC");
  //   } else if(this.isFilterDateDesc) {
  //     console.log("Date DESC");
  //   }
  // }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Delete History",
      message: "Are you sure to want to delete ?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Action Canceled");
          }
        },
        {
          text: "Delete",
          handler: () => {
            localStorage.removeItem("history");
            this.router.navigate(["/news"]);
          }
        }
      ]
    });

    await alert.present();
  }
}
