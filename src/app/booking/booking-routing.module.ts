import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingComponent } from './booking.component';
import { GuestComponent } from './guest/guest.component';

const routes: Routes = [
  { path: '', component: BookingComponent },
  { path: 'guest', component: GuestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
