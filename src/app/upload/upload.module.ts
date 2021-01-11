import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { CommonsModule } from '../components/commons/commons.module';
import { MaterialModule } from '../components/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    CommonsModule,
    MaterialModule,
    FormsModule
  ]
})
export class UploadModule { }
