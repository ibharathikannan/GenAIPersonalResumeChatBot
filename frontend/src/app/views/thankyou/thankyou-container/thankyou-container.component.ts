import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { BookingModel } from '@app/shared/models/booking.model';
import { StockAlertModel } from '@app/shared/models/stock-alert.model';
import { Helper } from '@app/utils/helper';
import { selectBooking } from '@app/views/booking/booking.selectors';
import { selectIsStockAlertSent, selectStockAlert } from '@app/views/register/register.selectors';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
declare function s_control_click(vLinkTrackVars:any, vLinkTrackEvents:any, vLinkTrackValues:any, vType:any, vTypeName:any):any;

@Component({
  selector: 'anms-thankyou-container',
  templateUrl: './thankyou-container.component.html',
  styleUrls: ['./thankyou-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThankyouContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  booking: BookingModel;
  booking$: Observable<BookingModel>;
  
  isStockAlertSent: boolean;
  isStockAlertSent$: Observable<boolean>;
  
  stockAlert: StockAlertModel;
  stockAlert$: Observable<StockAlertModel>;

  constructor(private translate: TranslateService
    , private store: Store<AppState>
    , private activatedRoute: ActivatedRoute
    , private router: Router) { }

  ngOnInit(): void {
    Helper.trackGaPageView("thankyou", "Sesp-BookingSystem", "ThankYou");
    Helper.trackAaPageView("thankyou", "Sesp-BookingSystem", "ThankYou");

    this.store.pipe(select(selectIsStockAlertSent)).subscribe(isSent=> {

      if(isSent){
        this.stockAlert = new StockAlertModel();

        this.store.pipe(select(selectStockAlert)).subscribe(stockAlert=> {
          this.stockAlert = stockAlert;
          //console.log(this.stockAlert);
        });
      }
      else{
        this.booking = new BookingModel();

        this.store.pipe(select(selectBooking)).subscribe(booking=> {
          
          if(booking == null){
          }

          this.booking = booking;
        });
      }
    });

    this.isStockAlertSent$ = this.store.pipe(select(selectIsStockAlertSent));
    this.stockAlert$ = this.store.pipe(select(selectStockAlert));
    this.booking$ = this.store.pipe(select(selectBooking));

  }
  closewindow(){
    s_control_click('events,eVar33', 'event45', 'event45, sg:ses_booking:click_closewindow_button', 'o', 'microsite conversion type');
  }

}
