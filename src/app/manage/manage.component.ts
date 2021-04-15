import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  cdnUrl: string = environment.cdnLink;
  selectedState: any;

  constructor(private mainData: MainService, private http: HttpClient) { }

  ngOnInit() {
    this.getVendor();
    // this.getCountry();
    let state = this.mainData.selectedState.subscribe(data => {
      this.selectedState = data;
      // console.log(this.selectedState)
      this.getCities(this.selectedState.state_id);
    });
  }

  // countries
  countries: any;
  getCountry(){
    this.mainData.getCache(`api/get-countries`).subscribe(data => {
      this.countries = data;
    })
  }

  vendor: any;
  getVendor(){
    this.mainData.get(`api/vendor/get-vendor`).subscribe(data => {
      this.vendor = data[Object.keys(data)[0]];
      // console.log(this.vendor);
      this.getStates(this.vendor.city_info.states_info.country_info.country_id);
      this.getCities(this.vendor.city_info.states_info.state_id);
    })
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

  updateWaiting(){
    if(this.vendor){

    }
  }

  // update vendor details
  async updateVendor(form: NgForm){
    if(form.valid){
      await this.onMultipleSubmit().then(()=>{
        form.value['vendor_id'] = this.vendor.vendor_id;
        form.value['vendor_logo'] = this.vendor.vendor_logo;
        if(this.newsImageName) form.value['vendor_logo'] = this.newsImageName;
        this.mainData.post(form.value, `api/vendor/update-vendor`).subscribe(data =>{
          if(data){
            this.mainData.openToast("Updated Details!");
            this.vendorLogo.nativeElement.value = "";
          }
          else{
            this.mainData.openToast("Something went wrong!");
          }
        })
      })
    }
  }

  // file upload
  multipleImages: any = [];
  newsImageName: string ;
  logoPreview: any;
  @ViewChild('logo') vendorLogo: ElementRef;
  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
    let filenames = '';
    filenames += this.multipleImages[0].name;
    this.newsImageName = this.multipleImages[0].name;
    let image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.logoPreview = reader.result;
    reader.readAsDataURL(image);
  }

  resetImage(){
    this.vendorLogo.nativeElement.value = "";
    this.logoPreview = null;
  }

  async onMultipleSubmit(){
    await new Promise((resolve, reject) => {
      if(this.multipleImages.length > 0){
        const formData = new FormData();
        let d = new Date();
        this.newsImageName = `vendor_${d.getTime()}_${this.multipleImages[0].name}`
        for(let img of this.multipleImages){
          formData.append('files', img, `vendor_${d.getTime()}_${img.name}`);
        }
        this.http.post<any>(environment.apiUrl + 'api/vendor/upload-vendor-logo', formData).subscribe(
          (res) => {
            console.log('uploaded');
            resolve(true);
          },
          (err) => {
            // console.log('some err happened');
            resolve(false);
          }
        );

      }
      else{
        // this.mainData.openToast(`Cover image not uploaded!`);
        resolve(false);
      }
    })
  }

}
