import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingContainerComponent } from './booking-container/booking-container.component';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { bookingReducer } from './booking.reducer';
import { BookingEffects } from './booking.effects';


@NgModule({
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
    
  ],  
  declarations: [BookingContainerComponent],
})
export class BookingModule { }


