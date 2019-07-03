import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-article-history",
  templateUrl: "./article-history.page.html",
  styleUrls: ["./article-history.page.scss"]
})
export class ArticleHistoryPage implements OnInit {
  articlesHistory: any = [];

  constructor(public router: Router, public alertController: AlertController) {}

  ngOnInit() {
    this.articlesHistory = JSON.parse(localStorage.getItem("history"));
    this.articlesHistory = this.articlesHistory["articles"];
  }

  clearHistory() {
    // // localStorage.clear();
    localStorage.removeItem("history");
    this.router.navigate(["/news"]);
  }

  sortByName() {
    this.articlesHistory.sort((a, b) => a.title.localeCompare(b.title));
  }

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
