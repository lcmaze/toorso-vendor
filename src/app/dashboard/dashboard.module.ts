import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonsModule } from '../components/commons/commons.module';
import { MaterialModule } from '../components/material/material.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CommonsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
