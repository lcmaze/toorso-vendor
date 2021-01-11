import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('country') country: boolean = true;

  constructor(public dialog: MatDialog, private mainData: MainService, private fAuth: AngularFireAuth) { }

  money : string[] =  ['₹ INR', '$ Dollar'];
  locations : any = [
    {name: 'India', flag: 'india.jpg', branch: true, states: ['Kerala', 'Karnataka', 'Tamil Nadu']},
    {name: 'Oman', flag: 'oman.jpg', branch: false, states: null }
  ]
  selectedcurrency :string = this.money[0];
  selectedcountry :string = this.locations[0].name;
  branchvisible : any = true;
  statelist: string[] = this.locations[0].states;
  selectedstate : string = this.locations[0].states[0];
  selectedflag: string = this.locations[0].flag;

  userDetails: any;
  ngOnInit() {
    this.userDetails = this.mainData.userDetails;
  }

  logout(){
    this.fAuth.signOut();
    window.location.reload();
  }


  currencyselect(selectedcurrency :string){
    this.selectedcurrency = selectedcurrency;
  }

  countryselect(selectedcountry :string, branchvisible :string, statelist: any, selectedflag: string){
    this.selectedcountry = selectedcountry;
    this.branchvisible = branchvisible;
    this.statelist = statelist;
    this.selectedflag = selectedflag;
    console.log(this.selectedflag);
  }

  stateselect(selectedstate : string){
    this.selectedstate = selectedstate;
  }

}
