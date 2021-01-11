import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonsModule } from './components/commons/commons.module';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainService } from './services/main.service';
import { AuthInterceptor } from './services/auth-interceptor';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBNP7xpZeA90MK4R_4_xZ7qqG70hdL8U-o",
  authDomain: "toorso-vendor.firebaseapp.com",
  projectId: "toorso-vendor",
  storageBucket: "toorso-vendor.appspot.com",
  messagingSenderId: "762099082973",
  appId: "1:762099082973:web:c16c753fad05b0f9549d34",
  measurementId: "G-TVWYYSMQGY"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [
    MainService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
