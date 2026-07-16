import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingContainerComponent } from './booking-container/booking-container.component';

const routes: Routes = [
  {
    path: '',
    component: BookingContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
