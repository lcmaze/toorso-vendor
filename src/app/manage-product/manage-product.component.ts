import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  constructor(private mainData: MainService) { }

  membership_type: any;
  ngOnInit() {
    this.mainData.get(`api/vendor/get-vendor`).subscribe(data => {
      this.membership_type = data[0].membership.membership_type;
      if(this.membership_type != 'free'){
        this.getBranches();
      }
    });
  }

  // get branches
  branches: any;
  selectedBranch: any;
  getBranches(){
    this.mainData.get(`api/vendor/get-branches`).subscribe(data => {
      let branch = data['rows'][Object.keys(data['rows'])[0]];
      this.branches = data['rows'];
      this.selectedBranch = branch.branch_id;
      this.mainData.selectedBranch = this.selectedBranch;
      this.getProducts();
    })
  }

  products: any;
  showMainBox: boolean = false;
  getProducts(){
    this.products = [];
    this.mainData.get(`api/vendor/get-products?branch_id=${this.selectedBranch}`).subscribe(data => {
      this.products = data['rows'];
      this.showMainBox = true;
    })
  }

  // change branch 
  changeBranch(branch: any){
    this.mainData.selectedBranch = branch;
    this.getProducts();
  }

  deleteTable(id: any){
    console.log(id, this.products[id], this.products[id])
    if(!this.products[id]) this.products.splice(id, 1);
    else{
      let r = confirm("Are you sure to delete the table?");
      if(r){
        let obj = {};
        obj['product_id'] = this.products[id].product_id;
        // obj['price_id'] = this.products[id].prices[0].price_id;
        // obj['addon_id'] = this.products[id].addons[0].addonprice_id;
        this.mainData.delete(`api/vendor/delete-vendor-product?product_id=${this.products[id].product_id}`).subscribe(data => {
          if(data) {
            this.products.splice(id, 1);
            this.mainData.openToast('Deleted Table!');
          }
          else {
            this.mainData.openToast('Some error occurred!');
          }
        })
      }
    }
  }

}
