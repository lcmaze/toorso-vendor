import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private mainData: MainService) { }

  view: any = '';
  ngOnInit() {
    this.getBranches()
  }

  branches: any;
  getBranches(){
    this.mainData.get(`api/vendor/get-branches`).subscribe(data => {
      this.branches = data['rows'];
    })
  }

}
