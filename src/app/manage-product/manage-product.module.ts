import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductRoutingModule } from './manage-product-routing.module';
import { ManageProductComponent } from './manage-product.component';
import { CommonsModule } from '../components/commons/commons.module';
import { MaterialModule } from '../components/material/material.module';
import { EditBoxComponent } from './edit-box/edit-box.component';


@NgModule({
  declarations: [ManageProductComponent, EditBoxComponent],
  imports: [
    CommonModule,
    ManageProductRoutingModule,
    CommonsModule,
    MaterialModule,
  ]
})
export class ManageProductModule { }
