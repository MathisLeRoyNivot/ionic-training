import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Tab3Page } from '../tab3/tab3.page';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  form = {
    name: ""
  }

  // formgroup: FormGroup;
  // name: AbstractControl;

    // constructor(
    //   public navCtrl: NavController, 
    //   public navParams: NavParams, 
    //   public formBuilder: FormBuilder) {

    //     this.formgroup = formBuilder.group({
    //       name:['', Validators.required]
    //     })

    //     this.name = this.formgroup.controls['name'];

    //   }

  logForm() {
    let formData = this.form;
    console.log(formData);

    let isValid = new Boolean(false);

    if(isValid == true) {
      console.log("%cSuccessful redirection", "color: green")
      // this.navCtrl.push(Tab3Page);
    } else {
      console.log("%cCan't redirect", "color: red")
    }
  }

}
	