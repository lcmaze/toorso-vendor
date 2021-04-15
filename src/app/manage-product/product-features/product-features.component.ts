import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-product-features',
  templateUrl: './product-features.component.html',
  styleUrls: ['./product-features.component.scss']
})
export class ProductFeaturesComponent implements OnInit {

  constructor(private mainData: MainService) { }

  ngOnInit() {
    this.getBranches();
  }

  // get branches
  branches: any;
  selectedBranch: any;
  getBranches(){
    this.mainData.get(`api/vendor/get-branches`).subscribe(data => {
      let branch = data['rows'][Object.keys(data['rows'])[0]]
      this.branches = data['rows'];
      this.selectedBranch = branch.branch_id;
      this.mainData.selectedBranch = this.selectedBranch;
      this.getFoods();
      this.getTransportations();
      this.getFacilities();
    })
  }
  // change branch 
  changeBranch(branch: any){
    this.mainData.selectedBranch = branch;
    this.getFoods();
    this.getTransportations();
    this.getFacilities();
  }

  facilities: any;
  getFacilities(){
    this.mainData.get(`api/vendor/get-facilities?branch_id=${this.selectedBranch}`).subscribe(data => {
      this.facilities = data['rows'];
      for (let i = 0; i < this.facilities.length; i++) {
        this.facilities[i]['checked'] = false;
        if(this.facilities[i].branch_facility && this.facilities[i].branch_facility.branch_facility_id) this.facilities[i]['checked'] = true;
        if(!this.facilities[i].branch_facility) {
          this.facilities[i].branch_facility = {}; 
          this.facilities[i].branch_facility['facility_type'] = 'free';
        }
      }
      // console.log(this.facilities);
    })
  }

  transportations: any;
  getTransportations(){
    this.mainData.get(`api/vendor/get-transportations?branch_id=${this.selectedBranch}`).subscribe(data => {
      this.transportations = data['rows'];
      for (let i = 0; i < this.transportations.length; i++) {
        this.transportations[i]['checked'] = false;
        if(this.transportations[i].branch_transportation && this.transportations[i].branch_transportation.branch_transportation_id) this.transportations[i]['checked'] = true;
        if(!this.transportations[i].branch_transportation) {
          this.transportations[i].branch_transportation = {};
          this.transportations[i].branch_transportation['transportation_type'] = 'free';
        }
      }
    })
  }
  foods: any;
  getFoods(){
    this.mainData.get(`api/vendor/get-foods?branch_id=${this.selectedBranch}`).subscribe(data => {
      this.foods = data['rows'];
      for (let i = 0; i < this.foods.length; i++) {
        this.foods[i]['checked'] = false;
        if(this.foods[i].branch_food && this.foods[i].branch_food.branch_food_id) this.foods[i]['checked'] = true;
        if(!this.foods[i].branch_food) {
          this.foods[i].branch_food = {};
          this.foods[i].branch_food['food_type'] = 'free';
        }
      }
    })
  }

  // submit details 
  submitFacilities(form: NgForm){
    if(form.valid){
      this.facilities[0]['branch_id'] = this.mainData.selectedBranch;
      // console.log(this.facilities);
      this.mainData.post(this.facilities, 'api/vendor/update-branch-facility').subscribe(data => {
        if(data){
          this.mainData.openToast('Updated!');
          this.getFacilities();
        }
        else{
          this.mainData.openToast('Some error occurred!');
        }
      })
    }
  }
  submitTransportation(form: NgForm){
    if(form.valid){
      this.transportations[0]['branch_id'] = this.mainData.selectedBranch;
      // console.log(this.transportations);
      this.mainData.post(this.transportations, 'api/vendor/update-branch-transportation').subscribe(data => {
        if(data){
          this.mainData.openToast('Updated!');
          this.getTransportations();
        }
        else{
          this.mainData.openToast('Some error occurred!');
        }
      })
    }
  }
  submitFood(form: NgForm){
    if(form.valid){
      this.foods[0]['branch_id'] = this.mainData.selectedBranch;
      // console.log(this.foods);
      this.mainData.post(this.foods, 'api/vendor/update-branch-food').subscribe(data => {
        if(data){
          this.mainData.openToast('Updated!');
          this.getFoods();
        }
        else{
          this.mainData.openToast('Some error occurred!');
        }
      })
    }
  }

}
