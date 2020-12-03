import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { CommonsModule } from '../components/commons/commons.module';
import { MaterialModule } from '../components/material/material.module';
import { GuestComponent } from './guest/guest.component';


@NgModule({
  declarations: [BookingComponent, GuestComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    CommonsModule,
    MaterialModule
  ]
})
export class BookingModule { }
