import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  constructor(private mainData: MainService) { }

  ngOnInit() {
    this.getBranches();
  }

  // get branches
  branches: any;
  selectedBranch: any;
  getBranches(){
    this.mainData.get(`api/vendor/get-branches`).subscribe(data => {
      this.branches = data;
      this.selectedBranch = data[Object.keys(data)[0]].branch_id;
      this.mainData.selectedBranch = this.selectedBranch;
      this.getProducts();
    })
  }

  products: any;
  showMainBox: boolean = false;
  getProducts(){
    this.products = [];
    this.mainData.get(`api/vendor/get-products?branch_id=${this.selectedBranch}`).subscribe(data => {
      this.products = data;
      // console.log(this.products);
      this.showMainBox = true;
    })
  }

  // change branch 
  changeBranch(branch: any){
    this.mainData.selectedBranch = branch;
    // console.log(this.mainData.selectedBranch);
    this.getProducts();
  }

  deleteTable(id: any){
    if(id){
      // console.log(id, this.products[id], this.products[id])
      if(!this.products[id]) this.products.splice(id, 1);
      else{
        let r = confirm("Are you sure to delete the table?");
        if(r){
          let obj = {};
          obj['product_id'] = this.products[id].product_id;
          obj['price_id'] = this.products[id].prices[0].price_id;
          obj['addon_id'] = this.products[id].addons[0].addonprice_id;
          this.mainData.post(obj, `api/vendor/delete-vendor-product`).subscribe(data => {
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

}
