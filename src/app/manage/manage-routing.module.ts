import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddnewComponent } from './addnew/addnew.component';

import { ManageComponent } from './manage.component';

const routes: Routes = [
  { path: '', component: ManageComponent },
  { path: 'add', component: AddnewComponent },
  { path: ':id', component: AddnewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
