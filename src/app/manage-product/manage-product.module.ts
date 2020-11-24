import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductRoutingModule } from './manage-product-routing.module';
import { ManageProductComponent } from './manage-product.component';
import { CommonsModule } from '../components/commons/commons.module';
import { MaterialModule } from '../components/material/material.module';
import { EditBoxComponent } from './edit-box/edit-box.component';
import { ProductFeaturesComponent } from './product-features/product-features.component';


@NgModule({
  declarations: [ManageProductComponent, EditBoxComponent, ProductFeaturesComponent],
  imports: [
    CommonModule,
    ManageProductRoutingModule,
    CommonsModule,
    MaterialModule,
  ]
})
export class ManageProductModule { }
