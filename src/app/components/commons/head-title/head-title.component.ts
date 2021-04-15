import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-head-title',
  templateUrl: './head-title.component.html',
  styleUrls: ['./head-title.component.scss']
})
export class HeadTitleComponent implements OnInit {

  constructor(private mainData: MainService) { }

  vendorDetails: any;
  ngOnInit() {
    this.mainData.get(`api/vendor/get-vendor`).subscribe(data => {
      this.vendorDetails = data[Object.keys(data)[0]];
      this.mainData.selectedVendor = this.vendorDetails;
    })
  }

  formatDate(data: any){
    if(data){
      if(data.contract_end_date){
        let d = new Date(data.contract_end_date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`; 
      }
      else{
        return `--/--/----`
      }
    }
  }

}
