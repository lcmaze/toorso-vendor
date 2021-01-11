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

  ngOnInit(): void {
  }

  async login(form: NgForm){
    if(form.valid){
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
  }

}
