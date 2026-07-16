import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, NotificationService, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { ConfirmationDialogComponent } from '@app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ProductListModel } from '@app/shared/models/product.model';
import { RegisterModel } from '@app/shared/models/register.model';
import { StoreListModel } from '@app/shared/models/store.model';
import { TimeSlotModel } from '@app/shared/models/time-slot.model';
import { selectBooking } from '@app/views/booking/booking.selectors';
import { ActionSaveFormInfo, ActionSubmitBooking } from '@app/views/register/register.actions';
import { getFormInfo, getProductList, getStoreList, selectErrorMessage, selectFilteredTimeSlots, selectIsSubmitFailed, selectTimeSlots } from '@app/views/register/register.selectors';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Console } from 'node:console';
import { Observable, Subscription } from 'rxjs';
import { RegisterService } from '@app/shared/services/register.service';
import { Helper } from '@app/utils/helper';
declare var g_captcha_key: any;
declare function s_control_click(vLinkTrackVars: any, vLinkTrackEvents: any, vLinkTrackValues: any, vType: any, vTypeName: any): any;

@Component({
  selector: 'anms-summary-container',
  templateUrl: './summary-container.component.html',
  styleUrls: ['./summary-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryContainerComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  captchaResponse: string;
  isConsentGiven1: boolean;
  isConsentGiven2: boolean;
  isOptToMarketing: boolean;
  formInfo: RegisterModel;

  g_captcha_key = g_captcha_key;
  recaptchaControl = new FormControl(null, [
    Validators.required
  ]);

  products: ProductListModel[] = [];
  locations: StoreListModel[] = [];
  timeslots: TimeSlotModel[] = [];
  selectedProduct;
  selectedLocation;
  selectedTimeSlot;
  firstName;
  lastName;
  email;
  mobileNumber;
  product;
  storeLocation;
  timeSlot;
  imageUrl;
  category;
  type;


  dialogOutOfStock: Subscription;

  errorMessage: string;

  constructor(private translate: TranslateService
    , private registerService: RegisterService
    , private notification: NotificationService
    , private store: Store<AppState>
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , public dialog: MatDialog) { }

  ngOnInit(): void {
    Helper.trackGaPageView("summary", "Sesp-BookingSystem", "BookingSummary");
    Helper.trackAaPageView("summary", "Sesp-BookingSystem", "BookingSummary");
    this.errorMessage = "";

    this.store.pipe(select(getFormInfo)).subscribe(formInfo => {
      this.formInfo = formInfo;
      if (this.formInfo != undefined) {
        this.firstName = this.formInfo.firstName;
        this.lastName = this.formInfo.lastName;
        this.email = this.formInfo.email;
        this.mobileNumber = this.formInfo.mobileNumber
        this.storeLocation = this.formInfo.storeLocation;
        this.timeSlot = this.formInfo.timeSlot;
        this.product = this.formInfo.product;
        this.imageUrl = this.formInfo.imageUrl;
        if (this.formInfo.product.category == 'APPOINTMENT TYPE') {
          this.category = this.product.name;
        }
        else {
          this.category = 'Samsung Live Space';
        }
        this.type=this.formInfo.type;


        // this.store.pipe(select(getProductList)).subscribe(products => {
        //   this.products = products;
        //   this.selectedProduct = this.products.find(i => i.id === this.formInfo.productId);
        // });

        this.store.pipe(select(getStoreList)).subscribe(locations => {
          this.locations = locations;
          this.selectedLocation = this.locations.find(i => i.id === this.formInfo.storeId);
        });

        this.store.pipe(select(selectFilteredTimeSlots)).subscribe(timeslots => {
          this.timeslots = timeslots;
          this.selectedTimeSlot = this.timeslots.find(i => i.id === this.formInfo.timeSlotId);
        });
      }
      else{
        this.router.navigate(['register']);
      }
    });
  }

  onCheckboxChange1(event: any) {
    this.isConsentGiven1 = event.checked;
  }

  onCheckboxChange2(event: any) {
    this.isConsentGiven2 = event.checked;
  }

  onCheckboxChange3(event: any) {
    this.isOptToMarketing = event.checked;
  }


  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  getRecaptchaErrorMessage() {
    return this.recaptchaControl.hasError('required') // && this.isSubmit
      ? 'This field is required.' : '';
  }

  submit() {
    s_control_click('events,eVar33', 'event45', 'event45, ses_booking:click_submit_button', 'o', 'microsite conversion type');
    //reset recaptcha

    if (this.formInfo != undefined) {
      let newRegisterModel = new RegisterModel();
      newRegisterModel.firstName = this.formInfo.firstName;
      newRegisterModel.lastName = this.formInfo.lastName;
      newRegisterModel.email = this.formInfo.email;
      newRegisterModel.mobileNumber = this.formInfo.mobileNumber;
      newRegisterModel.expiredDateTime = this.formInfo.expiredDateTime;
      newRegisterModel.storeId = this.storeLocation.id;
      newRegisterModel.productId = this.product.id;
      newRegisterModel.timeSlotId = this.formInfo.timeSlot.id;
      newRegisterModel.captchaResponse = this.captchaResponse;
      newRegisterModel.isConsent = this.isConsentGiven2;
      newRegisterModel.storeLocation = this.formInfo.storeLocation;
      newRegisterModel.timeSlot = this.formInfo.timeSlot;
      newRegisterModel.product = this.formInfo.product;
      newRegisterModel.bookingType = this.category;
      newRegisterModel.imageUrl = this.imageUrl;
      newRegisterModel.type=this.formInfo.type;

      // this.store.dispatch(
      //   new ActionSaveFormInfo({ registerModel: newRegisterModel })
      // );

      this.store.dispatch(
        new ActionSubmitBooking({ registerModel: newRegisterModel })
      );

      this.store.pipe(select(selectIsSubmitFailed)).subscribe(isFailed => {

        if (isFailed) {
          this.store.pipe(select(selectErrorMessage)).subscribe(errorMessage => {

            // to avoid multiple popup
            if (this.errorMessage !== errorMessage) {
              this.errorMessage = errorMessage

              if (errorMessage == "Stock unavailable.") {
                const dialogRef = this.dialog.open(ConfirmationDialogComponent,
                  {
                    data: {
                      title: 'Out of stock!',
                      content: 'Do you want to go back to re-select the device and location?',
                      isNoButtonNeeded: false
                    }
                  });

                this.dialogOutOfStock = dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    this.router.navigate(['register']);
                  }
                });
              }
              else if (errorMessage == "Time slot unavailable.") {
                const dialogRef = this.dialog.open(ConfirmationDialogComponent,
                  {
                    data: {
                      title: 'Oops! The selected time slot is currently unavailable.',
                      content: 'Please select another appointment time.',
                      isNoButtonNeeded: false
                    }
                  });


                this.dialogOutOfStock = dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    this.router.navigate(['register']);
                  }
                });
              }

              else {
                this.router.navigate(['booking']);
              }
            }

          });

        }
        else {
          this.store.pipe(select(selectBooking)).subscribe(booking => {
            if (booking != null) {
              this.router.navigate(['thankyou']);
            }
          });
        }

      });

      this.recaptchaControl.reset();
    }
    else {
      this.router.navigate(['register']);
    }
  }
}
