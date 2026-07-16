import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingDetailRoutingModule } from './booking-detail-routing.module';
import { BookingDetailContainerComponent } from './booking-detail-container/booking-detail-container.component';
import { SharedModule } from '@app/shared';
import { EffectsModule } from '@ngrx/effects';
import { BookingEffects } from '../booking/booking.effects';
import { StoreModule } from '@ngrx/store';
import { bookingReducer } from '../booking/booking.reducer';


@NgModule({
  declarations: [BookingDetailContainerComponent],
  imports: [
    CommonModule,
    BookingDetailRoutingModule,
    SharedModule,
    StoreModule.forFeature('booking', bookingReducer),
    EffectsModule.forFeature([BookingEffects])
  ]
})
export class BookingDetailModule { }
