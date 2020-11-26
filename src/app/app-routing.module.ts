import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'manage', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule) },
  { path: 'manage-product', loadChildren: () => import('./manage-product/manage-product.module').then(m => m.ManageProductModule) },
  { path: 'upload', loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
