import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingDetailContainerComponent } from './booking-detail-container/booking-detail-container.component';

const routes: Routes = [
  {
    path: '',
    component: BookingDetailContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingDetailRoutingModule { }
