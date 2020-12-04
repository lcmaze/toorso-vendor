import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { CommonsModule } from '../components/commons/commons.module';
import { MaterialModule } from '../components/material/material.module';
import { InvoiceBoxComponent } from './invoice-box/invoice-box.component';


@NgModule({
  declarations: [SalesComponent, InvoiceBoxComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    CommonsModule,
    MaterialModule,
  ]
})
export class SalesModule { }
