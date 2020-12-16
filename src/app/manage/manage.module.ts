import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { CommonsModule } from '../components/commons/commons.module';
import { AddnewComponent } from './addnew/addnew.component';
import { MaterialModule } from '../components/material/material.module';


@NgModule({
  declarations: [ManageComponent, AddnewComponent],
  imports: [
    CommonModule,
    ManageRoutingModule,
    CommonsModule,
    MaterialModule
  ]
})
export class ManageModule { }