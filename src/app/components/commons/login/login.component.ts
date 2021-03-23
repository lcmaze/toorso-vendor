import { Component, OnInit } from '@angular/core';
// import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fAuth: AngularFireAuth, private mainData: MainService) { }

  showLogin: boolean = true;

  ngOnInit(): void {
    this.getCountry();
  }

  async login(form: NgForm){
    if(form.valid && this.showLogin === true){
      this.fAuth.signInWithEmailAndPassword(form.value.email, form.value.password).then(user => {
        if(user){
          this.mainData.uid = user.user.uid;
          this.mainData.userDetails = user.user;
        }
      })
      .catch(err => {
        this.mainData.openToast(err.message);
      })
    }
    else if(form.valid && this.showLogin === false){
      // console.log(form.value); 
      this.mainData.post(form.value, `api/vendor/register-vendor`).subscribe(data => {
        if(data === true){
          this.mainData.openToast("Registered Successfully!");
          this.showLogin = true;
        }
        else{
          this.mainData.openToast(data['message']);
        }
      });
    }
  }

  // states 
  states: any;
  getStates(id: any){
    this.mainData.getCache(`api/get-states?id=${id}`).subscribe(data => {
      this.states = data.rows;
    })
  }

  // cities 
  cities: any;
  getCities(id: any){
    this.mainData.getCache(`api/get-cities?id=${id}`).subscribe(data => {
      this.cities = data.rows;
    })
  }

  // countries
  countries: any;
  getCountry(){
    this.mainData.getCache(`api/get-countries`).subscribe(data => {
      this.countries = data;
    })
  }

}
