import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  form = {
    name: ""
  }

  constructor(public router: Router) {}

  logForm() {
    let formData = this.form;
    console.log(formData);

    localStorage.clear();
    localStorage.setItem('name', formData.name);

    this.router.navigate(['/test']);
  }

}