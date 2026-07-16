import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, NotificationService, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Helper } from '@app/utils/helper';
import { ActionGetProductList } from '@app/views/register/register.actions';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ActionRetrieveBooking } from '../booking.actions';
import { selectBooking, selectBookingState } from '../booking.selectors';
declare function s_control_click(vLinkTrackVars:any, vLinkTrackEvents:any, vLinkTrackValues:any, vType:any, vTypeName:any):any;

@Component({
  selector: 'anms-booking-container',
  templateUrl: './booking-container.component.html',
  styleUrls: ['./booking-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingContainerComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;  
  bookingReferenceFormControl = new FormControl('', [
    Validators.required,
  ]);
  bookingRefField: string;

  constructor(private translate: TranslateService
    , private notification: NotificationService
    , private store: Store<AppState>
    , private activatedRoute: ActivatedRoute
    , private router: Router) { }

  ngOnInit(): void {
    Helper.trackGaPageView("booking", "Sesp-BookingSystem", "Booking");
    Helper.trackAaPageView("booking", "Sesp-BookingSystem", "Booking");
  }

  bookNow(){
    s_control_click('events,eVar33', 'event45', 'event45, sg:ses_booking:click_booknow_button', 'o', 'microsite conversion type');
    this.router.navigate(['register']);
  }
}
