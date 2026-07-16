import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService, AppState } from '@app/core';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { CustomEmailValidator, CustomNameTrimValidator, CustomNameValidator } from '@app/core/validators/regex.validators';
import { ActionCheckIsEmailValid, ActionGetAllStore, ActionGetProductList, ActionGetStockAlert, ActionGetStoreList, ActionGetTimeSlotByStore, ActionSaveFormInfo, ActionSaveSelectedDate, ActionSubmitStockAlert } from '../register.actions';
import { getAllStoreList, getFormInfo, getProductList, getStoreList, selectFilteredTimeSlots, selectFilteredHasTimeSlots, selectIsEmailValid, selectStockAlert, selectTimeSlots } from '../register.selectors';
import { ProductListModel, ProductModel } from '@app/shared/models/product.model';
import { Observable, of } from 'rxjs';
import { StoreListModel } from '@app/shared/models/store.model';
import { environment } from '@env/environment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RegisterModel } from '@app/shared/models/register.model';
import { ContactNumberValidator } from '@app/core/validators/custom.validators';
import { StockAlertModel, StockAlertSubmissionRequest } from '@app/shared/models/stock-alert.model';
import { RetrieveTimeSlotModel, TimeSlotModel } from '@app/shared/models/time-slot.model';
import { RegisterService } from '@app/shared/services/register.service';
import { Helper } from '@app/utils/helper';
declare var g_captcha_key: any;
declare function s_control_click(vLinkTrackVars:any, vLinkTrackEvents:any, vLinkTrackValues:any, vType:any, vTypeName:any):any;

@Component({
  selector: 'eus-register-container',
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss']
})
export class RegisterContainerComponent implements OnInit {

  appointmentTypes: any = [];
  typeSelected;
  categories: any = [];
  isMasterDemo = true;

  storeLocation;
  timeSlot;
  expiredDateTime;
  
  testDates: Date[] = [];
  map = null;
  myFilter = null;
  locations;
  locationsList;
  timeslots;
  selectedDate;
  availableTimeslots;
  date = new FormControl(null);

// loading
routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
form = new FormGroup({});
model: PersonalInfoModel;
options: FormlyFormOptions = {};
formInfo: RegisterModel;

//contact numbers
contactNumberInput: string;
contactNumberFormControl = new FormControl('', [
  Validators.required,
  ContactNumberValidator('sg')
]);

products: ProductModel[] = [];
selectedProduct: ProductModel;

locations$: Observable<StoreListModel[]>;
selectedLocation: StoreListModel;

notifyLocations$: Observable<StoreListModel[]>;
selectedNotifyLocation: StoreListModel;

stockAlertRef: string;
//stockAlert$: Observable<StockAlertModel>;
stockAlert: StockAlertModel;

// getProducts(): Observable<ProductModel[]> {
//   return of(this.products);
// }

fields: FormlyFieldConfig[] = [];

//dp filter
minDate: Date;
maxDate: Date;
//selectedDate: Date;

isNotifyChecked: boolean;
checkbox2: boolean;
checkbox3: boolean;
captchaResponse: string;

g_captcha_key = g_captcha_key;
recaptchaControl = new FormControl(null, [
  Validators.required
]);

//timeslot
collectionDayRange: number;
hasTimeSlots$: Observable<TimeSlotModel[]>;
timeslots$: Observable<TimeSlotModel[]>;
selectedTimeSlot: TimeSlotModel;

constructor(private translate: TranslateService
  , private notification: NotificationService
  , private registerService: RegisterService
  , private store: Store<AppState>
  , private activatedRoute: ActivatedRoute
  , private router: Router) 
  {

    const now = new Date();
    this.minDate = new Date();
    environment.collectionDate.setHours(0, 0, 0, 0);
    if (now > environment.collectionDate) {
      this.minDate.setDate(now.getDate());
    }
    else {
      this.minDate = environment.collectionDate;
    }
    this.maxDate = new Date(this.minDate.valueOf());
    // get the configurable value to calculate the maxDate
    this.collectionDayRange = environment.collectionDayCount;
    this.maxDate.setDate(this.maxDate.getDate() + (this.collectionDayRange - 1));

    this.model = new PersonalInfoModel();
  }

  ngOnInit() {
    Helper.trackGaPageView("register", "Sesp-BookingSystem", "SESPBookingSystem");
    Helper.trackAaPageView("register", "Sesp-BookingSystem", "RegisterBooking");
    this.ClearAllInput();
    this.GetStores();
    this.getAppointmentType();
    this.setupFormlyFields();

    // Get product lists
    this.store.dispatch(
      new ActionGetProductList()
    );

    // Get all stores for notification
    this.store.dispatch(new ActionGetAllStore());

    this.store.pipe(select(getProductList)).subscribe(products => {
      this.products = products;
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.stockAlertRef = params['stockAlertRef'];

      if (this.stockAlertRef != null) {

        this.store.dispatch(new ActionGetStockAlert({ refNumber: this.stockAlertRef }));

        //this.stockAlert$ = this.store.pipe(select(selectStockAlert));
        this.store.pipe(select(selectStockAlert)).subscribe(stockAlert => {
          this.stockAlert = stockAlert;

          if (this.stockAlert != undefined) {

            this.model.FirstName = this.stockAlert.firstName;
            this.model.LastName = this.stockAlert.lastName;
            this.model.Email = this.stockAlert.email;
            this.contactNumberInput = this.stockAlert.mobileNumber;
            //this.options.updateInitialValue();
            //this.options.resetModel();
          }

        });
      }
      else {
      }

    });


    this.store.pipe(select(getFormInfo)).subscribe(formInfo => {
      this.formInfo = formInfo;

      if (this.formInfo != undefined) {
        this.model.FirstName = this.formInfo.firstName;
        this.model.LastName = this.formInfo.lastName;
        this.model.Email = this.formInfo.email;
        this.contactNumberInput = this.formInfo.mobileNumber;
        this.storeLocation = this.formInfo.storeLocation;
        //this.options.updateInitialValue();
        //this.options.resetModel();
      }
    });

    this.locations$ = this.store.pipe(select(getAllStoreList));
    this.notifyLocations$ = this.store.pipe(select(getAllStoreList));
    this.timeslots$ = this.store.pipe(select(selectFilteredTimeSlots));
    this.hasTimeSlots$ = this.store.pipe(select(selectFilteredHasTimeSlots));
  }

  setupFormlyFields() {
    this.fields.push(
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          //{
          //  className: 'col-12',
          //  template: '<h4 class="textcenter">Personal information</h4>',
          //},
          {
            className: 'col-6',
            key: 'FirstName',
            type: 'input',
            templateOptions: {
              appearance: 'outline',
              type: 'text',
              label: 'First Name',
              placeholder: 'Please enter your first name',
              required: true,
              minLength: 2
            },
            validators: {
              validation: [CustomNameValidator, CustomNameTrimValidator],
            },
            validation: {
              messages: {
                required: 'This field is required.',
                minlength: (error, field: FormlyFieldConfig) => this.translate.instant('eus.validation.minlengthValidationMessage', { value: field.templateOptions.minLength })
              }
            },
          },
          {
            className: 'col-6',
            key: 'LastName',
            type: 'input',
            templateOptions: {
              appearance: 'outline',
              type: 'text',
              label: 'Last Name',
              placeholder: 'Please enter your last name',
              required: true,
              minLength: 2
            },
            validators: {
              validation: [CustomNameValidator, CustomNameTrimValidator],
            },
            validation: {
              messages: {
                required: 'This field is required.',
                minlength: (error, field: FormlyFieldConfig) => this.translate.instant('eus.validation.minlengthValidationMessage', { value: field.templateOptions.minLength })
              }
            },
          },
          {
            className: 'col-12',
            key: 'Email',
            type: 'input',
            templateOptions: {
              appearance: 'outline',
              type: 'email',
              label: 'Email address',
              placeholder: 'Please enter the email address',
              required: true,
            },
            modelOptions: {
              updateOn: 'blur'
            },
            validators: {
              validation: [CustomEmailValidator],
            },
            validation: {
              messages: {
                required: 'This field is required.',
                email: (error, field: FormlyFieldConfig) => this.translate.instant('eus.validation.email', { value: field.formControl.value }),
              }
            },
            // asyncValidators: {
            //   isEmailValid: {
            //     expression: (control: FormControl) => {
            //       return new Promise((resolve, reject) => {

            //         this.store.dispatch(
            //           new ActionCheckIsEmailValid({ email: control.value })
            //         );

            //         setTimeout(() => {
            //           this.store.pipe(select(selectIsEmailValid)).subscribe(
            //             isemailunique => {
            //               resolve(isemailunique);
            //             }
            //           );
            //         }, 4000);
            //       });
            //     },
            //     message: 'This is not a valid email address.',
            //   },
            // },
          },
        ]
      },

    );
  }

  selectAppointmentType(appointmentType, el: HTMLElement, el2: HTMLElement) {
    // this.categories = [];

    if (this.form.valid && this.contactNumberFormControl.valid) {
      this.typeSelected = appointmentType;
      // this.getCategory(category.lookupKey)
      el.scrollIntoView();
      if (appointmentType.name == 'Samsung Live Space') {
        this.isMasterDemo = true
        s_control_click('events,eVar33', 'event45', 'event45, sg:ses_booking:click_samsunglivespace_option', 'o', 'microsite conversion type');
        
        let newRegisterModel = new RegisterModel();
        newRegisterModel.firstName = this.model.FirstName;
        newRegisterModel.lastName = this.model.LastName;
        newRegisterModel.email = this.model.Email;
        newRegisterModel.mobileNumber = this.contactNumberInput;
        newRegisterModel.expiredDateTime = this.selectedDate;
        newRegisterModel.storeId = 0;
        newRegisterModel.productId = this.typeSelected.lookupKey;
        newRegisterModel.timeSlotId = 0;
        newRegisterModel.imageUrl = this.typeSelected.imageUrl;
        newRegisterModel.product = this.typeSelected;
        newRegisterModel.storeLocation = this.selectedLocation;
        newRegisterModel.timeSlot = this.timeSlot;
        newRegisterModel.type=this.typeSelected.type;
        
        this.store.dispatch(
          new ActionSaveFormInfo({ registerModel: newRegisterModel })
        );    
        
        this.router.navigate(['/register/master']);
      }
      else {
        this.isMasterDemo = false;
        // this.productSelected = category;
        // this.categorySelected = category;
        if(appointmentType.name == 'Switch Programme'){
          s_control_click('events,eVar33', 'event45', 'event45, sg:ses_booking:click_switchprogramme_option', 'o', 'microsite conversion type');
        }
        else{
          s_control_click('events,eVar33', 'event45', 'event45, sg:ses_booking:click_trade-in_option', 'o', 'microsite conversion type');
        }
        this.locationsList = this.locations.filter(x=>x.storeType==1);
      }
    }
    else {
      el2.scrollIntoView();
    }

    this.resetformlower();
  }

  ClearAllInput() {
    this.typeSelected = null;
    // this.categorySelected = null;
    // this.seriesSelected = null;
    // this.modelSelected = null;
    // this.productSelected = null;
    this.storeLocation = null;
    this.timeSlot = null;
    this.expiredDateTime = null;
    this.selectedLocation = null;

  }

  selectLocation() {
    this.timeslots = null;
    this.timeSlot = null;
    this.selectedTimeSlot = null;
    this.selectedDate = null;

    if (this.selectedLocation) {
      s_control_click('events,eVar33', 'event45', 'event45, sg:ses_booking:click_selectlocation_option', 'o', 'microsite conversion type');
      var retriveTimeSlotModel = new RetrieveTimeSlotModel();

      retriveTimeSlotModel.days = this.collectionDayRange;
      retriveTimeSlotModel.storeId = this.selectedLocation.id;

      this.getTimeSlotByStore(retriveTimeSlotModel);

      const iframe = document.getElementById('storeLocation') as HTMLIFrameElement;
      iframe.contentWindow.location.replace(this.selectedLocation.locationUrl);
      iframe.style.display = "block";


      this.date = new FormControl(null);

      //--  Apply Filter to Dates --//

      this.myFilter = (d: Date): boolean => {
        var testDates: Date[] = [];
        if (this.timeslots) {
          this.timeslots.forEach(function (value) {
            var day = new Date(value.startDateTime);
            testDates.push(new Date(day.setHours(0, 0, 0, 0)));
          });
        }

        let x = false;
        testDates.forEach((item) => {
          if (item != null && d != null && item.toDateString() == d.toDateString()) {
            x = true;
          }
        });
        return x;
      };
    }
  }

  continue() {
    s_control_click('events,eVar33', 'event45', 'event45, ses_booking:click_continue_button', 'o', 'microsite conversion type');

    let newRegisterModel = new RegisterModel();

    newRegisterModel.firstName = this.model.FirstName;
    newRegisterModel.lastName = this.model.LastName;
    newRegisterModel.email = this.model.Email;
    newRegisterModel.mobileNumber = this.contactNumberInput;
    newRegisterModel.expiredDateTime = this.selectedDate;
    newRegisterModel.storeId = this.selectedLocation.id;
    newRegisterModel.productId = this.typeSelected.lookupKey;
    newRegisterModel.timeSlotId = this.timeSlot.id;
    newRegisterModel.imageUrl = this.typeSelected.imageUrl;
    newRegisterModel.product = this.typeSelected;
    newRegisterModel.storeLocation = this.selectedLocation;
    newRegisterModel.timeSlot = this.timeSlot;
    newRegisterModel.type=this.typeSelected.type;
    //newRegisterModel.captchaResponse = this.captchaResponse;
    //newRegisterModel.isConsent = this.isConsentGiven;

    this.store.dispatch(
      new ActionSaveFormInfo({ registerModel: newRegisterModel })
    );

    this.router.navigate(['summary']);
    
  }

  GetStores() {
    this.registerService.getAllStore()
      .subscribe({
        next: (res) => {
          this.locations = res;
        },
        error: () => {

        }
      })
  }

  getTimeSlotByStore(timeSlotrequestObj: RetrieveTimeSlotModel) {
    this.registerService.getTimeSlotByStore(timeSlotrequestObj)
      .subscribe({
        next: (res) => {
          this.timeslots = res;
        },
        error: () => {

        }
      })
  }

  getAppointmentType() {
    this.registerService.getAppointmentType()
      .subscribe({
        next: (res) => {
          this.appointmentTypes = res;
          var sortOrder = ['Samsung Live Space', 'Switch Programme','Overtrade/ Trade-in'];
          this.appointmentTypes.sort(function(a,b){
            return sortOrder.indexOf(a.name)-sortOrder.indexOf(b.name);
          });
        },
        error: () => {
          //this.notificationService.error('Error while adding Store TimeSlot');
        }
      })
  }

  getNumber($event) {
    this.contactNumberInput = $event;
  }

  onCountryChange($event) {
  }

  getContactErrorMessage() {
    return this.contactNumberFormControl.hasError('required')
      ? 'This field is required.'
      : this.contactNumberFormControl.hasError('invalidNumber')
        ? 'Not a valid contact number'
        : '';
  }

  dateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectedTimeSlot = null;

    this.timeSlot = null;
    // convert to UTC time
    const date = Date.UTC(event.value.getFullYear()
      , event.value.getMonth()
      , event.value.getDate());

    this.selectedDate = new Date(date);

    if (this.timeslots) {
      var availableTimeslots: Date[] = [];
      var filterDate = this.selectedDate;
      this.timeslots.forEach(function (value) {
        var day = new Date(value.startDateTime);
        if (new Date(day.setHours(0, 0, 0, 0)).toDateString() == filterDate.toDateString()) {
          availableTimeslots.push(value);
        }
      });
      this.availableTimeslots = availableTimeslots;
    }
  }

  selectTimeSlot(ref, availableTimeslot: any): void {
    ref.toggleSelected();
    this.timeSlot = availableTimeslot;
    this.selectedTimeSlot = availableTimeslot;
    s_control_click('events,eVar33', 'event45', 'event45, sg:ses_booking:click_timeslot_option', 'o', 'microsite conversion type');
  }

  // Stock alert
  onNotifyCBChecked(event: any) {
    this.isNotifyChecked = event.checked;

    // Get all locations
    if (event.checked) {

    }
  }

  onCheckboxChange2(event: any) {
    this.checkbox2 = event.checked;
  }

  onCheckboxChange3(event: any) {
    this.checkbox3 = event.checked;
  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  getRecaptchaErrorMessage() {
    return this.recaptchaControl.hasError('required') // && this.isSubmit
      ? 'This field is required.' : '';
  }

  notifyMe() {

    let stockAlertSubmissionRequest = new StockAlertSubmissionRequest();

    stockAlertSubmissionRequest.firstName = this.model.FirstName;
    stockAlertSubmissionRequest.lastName = this.model.LastName;
    stockAlertSubmissionRequest.email = this.model.Email;
    stockAlertSubmissionRequest.mobileNumber = this.contactNumberInput;
    stockAlertSubmissionRequest.storeId = this.selectedLocation.id;
    // stockAlertSubmissionRequest.productId = this.productSelected;
    stockAlertSubmissionRequest.isConsent = true;
    stockAlertSubmissionRequest.captchaResponse = this.captchaResponse;

    this.store.dispatch(
      new ActionSubmitStockAlert({ submissionModel: stockAlertSubmissionRequest })
    );

    this.router.navigate(['thankyou']);

    this.recaptchaControl.reset();

  }

  resetformlower() {
    this.isNotifyChecked = false;
    this.selectedLocation = null;
    this.selectedNotifyLocation = null;
    this.selectedDate = null;
    this.checkbox2 = false;
    this.checkbox3 = false;
    this.GetStores();
    this.selectLocation();
    const iframe = document.getElementById('storeLocation') as HTMLIFrameElement;
    if (iframe != null)
      iframe.style.display = "none";
  }

}

export class PersonalInfoModel {

  FirstName: string;
  LastName: string;
  Email: string;

}
