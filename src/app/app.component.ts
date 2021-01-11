import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationEnd } from '@angular/router';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private fAuth: AngularFireAuth, private mainData: MainService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
    this.autoLogin();
  }

  loginStatus: boolean = false;

  async autoLogin(){
    // auto login status 
    await new Promise((resolve) => {
      this.fAuth.authState.subscribe(async (user) => {
        if (user) {
          let _this = this;
          this.mainData.uid = user.uid;
          this.mainData.userDetails = user;
          // await this.authData.getUserDetails(user.uid);
          user.getIdToken().then(function(idToken) { 
            // _this.authData.authStatusListener.next(true);
            // _this.authData.authKey = idToken;
            _this.loginStatus = true;
            resolve(true);
          });
        }
        else{
          resolve(false);
        }
      });
    });
    // console.log(this.loginStatus);
  }

}
