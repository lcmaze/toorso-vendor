import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.scss']
})
export class EditBoxComponent implements OnInit {

  @Input('editable') editable: boolean = false;
  @Input('product') product_val: any = null;
  @Input('prices') prices: any = null;
  @Input('addons') addons: any = null;
  @Input('id') id: any = null;
  @Output('refresh') refreshProducts: any = new EventEmitter();

  constructor(private mainData: MainService) { }

  bedQty: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  bedType: any = ['Single', 'Double'];
  roomQty: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  roomNumber: any = [];
  roomNumberVal: string;
  roomAmenities: any = [];
  roomAmenitiesVal: string;
  highlitedFeatures: any = [];
  highlitedFeaturesVal: string;
  product: any = {
    product_id: null, room_type: null, subtitle: null, have_ac: false, bed_qty: 1, bed_type: 'Single', room_qty: 1, room_numbers: null, room_amenities: null, highlited_features: null, 
    vendor_id: this.mainData.uid, branch_id: this.mainData.selectedBranch
  };
  product_prices: any = {
    vendor_id: this.mainData.uid, branch_id: this.mainData.selectedBranch, price_one: null, date_range_one_start: null, date_range_one_end: null, text_one: null,
    price_two: null, date_range_two_start: null, date_range_two_end: null, text_two: null, price_three: null, date_range_three_start: null, date_range_three_end: null, text_three: null,
    price_four: null, date_range_four_start: null, date_range_four_end: null, text_four: null,
    price_five: null, date_range_five_start: null, date_range_five_end: null, text_five: null,
  };
  product_addons: any = {
    vendor_id: this.mainData.uid, branch_id: this.mainData.selectedBranch, text_one: null, value_one: null, 
    text_two: null, value_two: null
  }

  ngOnInit() {
    if(this.product_val){
      this.product = this.product_val;
      // console.log(this.product);
      if(this.product.room_numbers) this.roomNumber = this.product.room_numbers.split(',');
      if(this.product.room_amenities) this.roomAmenities = this.product.room_amenities.split(',');
      if(this.product.highlited_features) this.highlitedFeatures = this.product.highlited_features.split(',');
    }
    if(this.prices) this.product_prices = this.prices[Object.keys(this.prices)[0]];
    if(this.addons) this.product_addons = this.addons[Object.keys(this.addons)[0]];
    // console.log(this.product_val, this.prices, this.addons);
  }

  style(): object {
    if (this.editable) {
      return {
        opacity: 1,
        pointerEvents: 'unset'
      }
    }
    else {
      return {
        opacity: 0.8,
        pointerEvents: 'none'
      }
    }
  }

  // manage array values (room number, amenities, features)
  addArrayVal(id: any){
    if(this.roomNumberVal && id === 1){
      this.roomNumber.push(this.roomNumberVal);
      this.roomNumberVal = null;
    }
    if(this.roomAmenitiesVal && id === 2){
      this.roomAmenities.push(this.roomAmenitiesVal);
      this.roomAmenitiesVal = null;
    }
    if(this.highlitedFeaturesVal && id === 3){
      this.highlitedFeatures.push(this.highlitedFeaturesVal);
      this.highlitedFeaturesVal = null;
    }
  }
  removeArrayVal(id: any, index: any){
    if(id === 1){
      this.roomNumber.splice(index, 1);
    }
    if(id === 2){
      this.roomAmenities.splice(index, 1);
    }
    if(id === 3){
      this.highlitedFeatures.splice(index, 1);
    }
  }

  saveProduct(){
    if(this.mainData.selectedBranch && this.mainData.uid){
      this.product.branch_id = this.mainData.selectedBranch;
      this.product_prices.branch_id = this.mainData.selectedBranch;
      this.product_addons.branch_id = this.mainData.selectedBranch;
      let obj = {};
      this.product['room_numbers'] = this.roomNumber.toString();
      this.product['room_amenities'] = this.roomAmenities.toString();
      this.product['highlited_features'] = this.highlitedFeatures.toString();
      obj['product'] = this.product;
      obj['prices'] = this.product_prices;
      obj['addons'] = this.product_addons;
      // console.log(obj);
      this.mainData.post(obj, 'api/vendor/add-branch-product').subscribe(data => {
        if(data){
          this.mainData.openToast('Updated Product!');
          if(data['id']) {
            this.product.product_id = data['id'];
            this.refreshProducts.emit(true);
          }
        }
        else{
          this.mainData.openToast('Some error occurred!');
        }
      })
    }
  }

}
