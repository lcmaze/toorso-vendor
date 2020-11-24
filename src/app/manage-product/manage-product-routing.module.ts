import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageProductComponent } from './manage-product.component';
import { ProductFeaturesComponent } from './product-features/product-features.component';

const routes: Routes = [
  { path: '', component: ManageProductComponent },
  { path: 'features', component: ProductFeaturesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProductRoutingModule { }
