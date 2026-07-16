import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { ConfirmationDialogComponent } from '@app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { BookingModel } from '@app/shared/models/booking.model';
import { Helper } from '@app/utils/helper';
import { ActionCancelBooking, ActionRetrieveBooking } from '@app/views/booking/booking.actions';
import { selectBooking } from '@app/views/booking/booking.selectors';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
declare function s_control_click(vLinkTrackVars:any, vLinkTrackEvents:any, vLinkTrackValues:any, vType:any, vTypeName:any):any;

@Component({
  selector: 'anms-booking-detail-container',
  templateUrl: './booking-detail-container.component.html',
  styleUrls: ['./booking-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingDetailContainerComponent implements OnInit, AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  booking: BookingModel;
  booking$: Observable<BookingModel>;
  dialogCancelBooking: Subscription;
  bookingRef: string;

  constructor(private translate: TranslateService
    , private store: Store<AppState>
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , public dialog: MatDialog) { }

  ngOnInit(): void {
    Helper.trackGaPageView("booking-detail", "Sesp-BookingSystem", "BookingDetails");
    Helper.trackAaPageView("booking-detail", "Sesp-BookingSystem", "BookingDetails");
    this.booking = new BookingModel();
    this.activatedRoute.queryParams.subscribe(params => {
      this.bookingRef = params['bookingRef'];

      this.store.dispatch(new ActionRetrieveBooking({ bookingRef: this.bookingRef }));

      this.booking$ = this.store.pipe(select(selectBooking));
      this.store.pipe(select(selectBooking)).subscribe(booking=> {
        this.booking = booking;
        
        // console.log(booking); 
      });

    });
  }

  ngAfterViewInit(): void {
    
  }

  cancelBooking() {
    s_control_click('events,eVar33', 'event45', 'event45, sg:ses_booking:click_cancelbooking_button', 'o', 'microsite conversion type');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        data: {
          title: 'Cancel Appointment?',
          content: 'Are you sure you want to cancel: ' + this.booking.refNumber + ' appointment?',
        }
      });

    this.dialogCancelBooking = dialogRef.afterClosed().subscribe(result => {
      if (result) {                
        this.store.dispatch(new ActionCancelBooking({ booking: this.booking }));
      }
    });
  }

  bookNow(){
    s_control_click('events,eVar33', 'event45', 'event45, sg:ses_booking:click_booknow_button', 'o', 'microsite conversion type');
    this.router.navigate(['register']);
  }

}
