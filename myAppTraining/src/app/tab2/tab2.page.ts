import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
import { Tab3Page } from '../tab3/tab3.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  form = {
    name: ""
  }

  constructor(public router: Router) {}

  logForm(name) {
    let formData = this.form;
    console.log(formData);

    localStorage.clear();
    localStorage.setItem('name', formData.name);

    this.router.navigateByUrl('/success', name);
  }
}
	