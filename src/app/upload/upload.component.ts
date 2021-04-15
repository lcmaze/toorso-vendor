import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private mainData: MainService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  cdnUrl: string = environment.cdnLink;

  ngOnInit() {
    this.getBranches();
  }

  // get branches
  branches: any;
  selectedBranch: any;
  selectedBranchDetails: any;
  getBranches(){
    this.mainData.get(`api/vendor/get-branches`).subscribe(data => {
      let branch = data['rows'][Object.keys(data['rows'])[0]];
      this.branches = data['rows'];
      this.selectedBranch = branch.branch_id;
      this.selectedBranchDetails = branch;
      this.mainData.selectedBranch = this.selectedBranch;
      this.getImages();
      this.setUrl(false);
    })
  }

  // change branch 
  changeBranch(branch: any){
    this.mainData.selectedBranch = branch;
    this.selectedBranch = branch;
    for (let i = 0; i < this.branches.length; i++) {
      if(this.branches[i].branch_id === Number(branch)){
        this.selectedBranchDetails = this.branches[i];
      }
    }
    this.getImages();
    this.setUrl(false);
  }

  youtubeLink: any;
  linkUrl: string;
  setUrl(val: boolean){
    this.linkUrl = this.selectedBranchDetails.video_url;
    if(this.linkUrl){
      this.linkUrl = this.linkUrl.replace('https://www.youtube.com/watch?v=', '');
      this.linkUrl = this.linkUrl.replace('https://youtu.be/', ''); 
      let link = `https://www.youtube.com/embed/${this.linkUrl}`;
      this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
      if(val){
        this.mainData.post({branch_id: this.selectedBranchDetails.branch_id, video: this.linkUrl}, 'api/vendor/update-branch-video').subscribe(data => {
          if(data) {
            this.mainData.openToast('Updated Video Successfully!');
          }
          else{
            this.mainData.openToast('Some error occurred!');
          }
        })
      }
    }
    else{
      this.youtubeLink = null;
    }
  }

  images: any;
  getImages(){
    this.mainData.get(`api/vendor/get-images?branch_id=${this.selectedBranch}`).subscribe(data => {
      this.images = data['rows'];
    })
  }

  // submit details
  async submitDetails(){
    if(this.multipleImages && this.multipleImages.length > 0){
      await this.onMultipleSubmit().then(()=>{
        // console.log('updating..');
        if(this.imageToUpload && this.imageToUpload.length > 0){
          this.mainData.post(this.imageToUpload, 'api/vendor/update-branch-gallery').subscribe(data => {
            if(data) {
              this.mainData.openToast('Updated Successfully!');
              this.previewImages = [];
              this.imageToUpload = [];
              this.getImages();
            }
            else{
              this.mainData.openToast('Some error occurred!');
            }
          })
        }
      })
    }
  }

  // file upload
  multipleImages: any = [];
  previewImages: any = [];
  imageToUpload: any = [];
  @ViewChild('logo') vendorLogo: ElementRef;
  selectMultipleImage(event){
    this.resetImage();
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
    for (let i = 0; i < this.multipleImages.length; i++) {
      let image = this.multipleImages[i];
      let reader = new FileReader();
      reader.onload = e => this.previewImages.push(reader.result);
      reader.readAsDataURL(image);
    }
  }

  resetImage(){
    this.vendorLogo.nativeElement.value = "";
    this.previewImages = [];
    this.multipleImages = [];
  }

  async onMultipleSubmit(){
    await new Promise((resolve, reject) => {
      if(this.multipleImages.length > 0){
        const formData = new FormData();
        let d = new Date();
        // this.newsImageName = `vendor_${d.getTime()}_${this.multipleImages[0].name}`
        for(let img of this.multipleImages){
          let obj = {};
          obj['branch_id'] = this.selectedBranch;
          obj['filename'] = `gallery_${d.getTime()}_${img.name}`;
          this.imageToUpload.push(obj);
          formData.append('files', img, `gallery_${d.getTime()}_${img.name}`);
        }
        this.http.post<any>(environment.apiUrl + 'api/vendor/upload-branch-images', formData).subscribe(
          (res) => {
            console.log('uploaded');
            this.resetImage();
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

  // delete
  delete(img: any){
    let r = confirm("Are you sure to delete the image?");
    if(r){
      this.mainData.delete(`api/vendor/delete-image?image_id=${img.image_id}`).subscribe(data => {
        if(data) {
          this.mainData.openToast('Deleted Successfully!');
          this.getImages();
        }
        else{
          this.mainData.openToast('Some error occurred!');
        }
      })
    }
  }

  // change status 
  changeStatus(img: any, image: any){
    // console.log(img.checked);
    this.mainData.post({status: img.checked, id: image.image_id}, 'api/vendor/change-image-status').subscribe(data => {
      if(data) {
        this.mainData.openToast('Status Changed Successfully!');
        this.getImages();
      }
      else{
        this.mainData.openToast('Some error occurred!');
      }
    })
  }

  updateUrl(){
    this.setUrl(true);
  }

}
