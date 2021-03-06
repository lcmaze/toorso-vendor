import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.scss']
})
export class AddnewComponent implements OnInit {

  cdnUrl: string = environment.cdnLink;

  constructor(private mainData: MainService, private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  id: any;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.id = data['params'].id;
      // console.log(this.id);
      if(this.id){
        this.getBranch();
      }
      else{
        this.getVendor();
      }
      this.getCountry();
    })
  }
  // manage array values (room number, amenities, features)
  addArrayVal(id: any){
    if(this.vendorKeywordsVal && id === 1){
      this.vendorKeywords.push(this.vendorKeywordsVal);
      this.vendorKeywordsVal = null;
    }
  }
  removeArrayVal(id: any, index: any){
    if(id === 1){
      this.vendorKeywords.splice(index, 1);
    }
  }

  vendor: any;
  getVendor(){
    this.mainData.get('api/vendor/get-vendor').subscribe(data => {
      this.vendor = data[Object.keys(data)[0]];
      // console.log(this.vendor);
      if(this.vendor){
        this.stateId = this.vendor.state_id;
        this.getStates(this.countryId);
        this.getCities(this.vendor.state_id);
      }
    })
  }

  // get branch
  branch: any;
  getBranch(){
    this.mainData.get(`api/vendor/get-branch-full?id=${this.id}`).subscribe(data => {
      this.branch = data['rows'][Object.keys(data['rows'])[0]];
      // console.log(this.branch);
      if(this.branch){
        if(this.branch.vendor_keywords) this.vendorKeywords = this.branch.vendor_keywords.split(',');
      }
    })
  }

  // countries
  countries: any;
  getCountry(){
    this.mainData.get(`api/get-countries`).subscribe(data => {
      this.countries = data;
      if(this.branch) {
        this.getStates(this.branch.city_info.states_info.country_info.country_id);
        this.getCities(this.branch.city_info.states_info.state_id);
      }
    })
  }

  // vendor: any;
  vendorKeywords: any = [];
  vendorKeywordsVal: any;
  countryId: any = 85;
  stateId: any;
  cityId: any;

  // states 
  states: any;
  getStates(id: any){
    this.mainData.get(`api/get-states?id=${id}`).subscribe(data => {
      this.states = data['rows'];
    })
  }

  // cities 
  cities: any;
  getCities(id: any){
    this.mainData.get(`api/get-cities?id=${id}`).subscribe(data => {
      this.cities = data['rows'];
    })
  }

  // update vendor details
  async addVendor(form: NgForm){
    if(form.valid){
      if(!this.branch){
        await this.onMultipleSubmit().then(()=>{
          form.value['vendor_id'] = this.mainData.uid;
          form.value['vendor_keywords'] = this.vendorKeywords.toString();
          form.value['vendor_logo'] = this.vendor.vendor_logo;
          if(this.newsImageName) form.value['vendor_logo'] = this.newsImageName;
          this.mainData.post(form.value, `api/vendor/add-vendor-branch`).subscribe(data =>{
            if(data){
              this.mainData.openToast("Updated Details!");
              this.vendorLogo.nativeElement.value = "";
              form.reset();
            }
            else{
              this.mainData.openToast("Something went wrong!");
            }
          })
        })
      }
      else if(this.branch){
        await this.onMultipleSubmit().then(()=>{
          form.value['vendor_id'] = this.mainData.uid;
          form.value['branch_id'] = this.branch.branch_id;
          form.value['vendor_logo'] = this.branch.vendor_logo;
          if(this.newsImageName) form.value['vendor_logo'] = this.newsImageName;
          form.value['vendor_keywords'] = this.vendorKeywords.toString();
          this.mainData.post(form.value, `api/vendor/update-vendor-branch`).subscribe(data =>{
            if(data){
              this.mainData.openToast("Updated Details!");
              this.vendorLogo.nativeElement.value = "";
              // form.reset();
            }
            else{
              this.mainData.openToast("Something went wrong!");
            }
          })
        })
      }
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
