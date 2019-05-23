import { NgModule, Injectable, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { LocationStrategy, HashLocationStrategy } from  '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DrawPage } from './draw/draw.page';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    File,
    Screenshot,
    Keyboard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
