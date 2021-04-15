import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-in-page-head',
  templateUrl: './in-page-head.component.html',
  styleUrls: ['./in-page-head.component.scss']
})
export class InPageHeadComponent implements OnInit {

  @Input('name') name: string;
  constructor(private mainData: MainService) { }

  userDetails: any;
  ngOnInit() {
    this.userDetails = this.mainData.selectedVendor;
  }

}
