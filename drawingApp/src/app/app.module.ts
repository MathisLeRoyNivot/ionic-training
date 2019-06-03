import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { File } from '@ionic-native/file/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { SettingsComponent } from './components/settings/settings.component';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { ColorPickerModule } from 'ngx-color-picker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Hammer Configuration
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    'pan': {
      direction: Hammer.DIRECTION_VERTICAL
    }
  }
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    [ColorPickerModule],
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    },
    File,
    Screenshot,
    Keyboard,
    Base64ToGallery
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
