import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild("nameInput") nameInput;

  form = {
    name: ""
  }

  constructor(
    public router: Router,
    private keyboard: Keyboard) {}


  async keyboardStatus() {
    if(this.keyboard.isVisible) {
      this.keyboard.hide();
      console.log("Keyboard closed !")
    } else {
      console.log("Keyboard already closed !");
    }
  }

  logForm() {

    this.keyboardStatus().then(() => {
      setTimeout(() => {
        let formData = this.form;
        console.log(formData);
          
        localStorage.clear();
        localStorage.setItem('name', formData.name);
      
        this.router.navigate(['/test']);
      }, 200)
    });
  };

}