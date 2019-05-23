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
  
  logForm() {
    this.keyboard.hide();
    let formData = this.form;
    console.log(formData);
    
    localStorage.clear();
    localStorage.setItem('name', formData.name);

    setTimeout(() => {
      this.router.navigate(['/test']);
    }, 50);
  }
}