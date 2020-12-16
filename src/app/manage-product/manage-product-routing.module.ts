import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageProductComponent } from './manage-product.component';
import { ProductFeaturesComponent } from './product-features/product-features.component';
import { PromotionComponent } from './promotion/promotion.component';

const routes: Routes = [
  { path: '', component: ManageProductComponent },
  { path: 'features', component: ProductFeaturesComponent },
  { path: 'promotion', component: PromotionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProductRoutingModule { }
