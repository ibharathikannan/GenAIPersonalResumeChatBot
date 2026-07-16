import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppState, NotificationService, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ActionGetAllStore, ActionSaveFormInfo } from '../register.actions';
import { getAllStoreList, getFormInfo, selectFilteredHasTimeSlots, selectFilteredTimeSlots } from '../register.selectors';
import { FormControl } from '@angular/forms';
import { StoreListModel } from '@app/shared/models/store.model';
import { Observable } from 'rxjs';
import { RetrieveTimeSlotModel, TimeSlotModel } from '@app/shared/models/time-slot.model';
import { RegisterService } from '@app/shared/services/register.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RegisterModel } from '@app/shared/models/register.model';
import { environment } from '@env/environment';
declare function s_control_click(vLinkTrackVars:any, vLinkTrackEvents:any, vLinkTrackValues:any, vType:any, vTypeName:any):any;


@Component({
  selector: 'anms-master-store-details',
  templateUrl: './master-store-details.component.html',
  styleUrls: ['./master-store-details.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterStoreDetailsComponent implements OnInit {
  
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  locations$: Observable<StoreListModel[]>;
  selectedLocation: StoreListModel; 
  masterClassId;
  locations;
  locationsList;
  storeLocation;
  timeSlot;
  expiredDateTime;
  testDates: Date[] = [];
  map = null;
  myFilter = null;
  timeslots;
  selectedDate;
  availableTimeslots;
  date = new FormControl(null);

  //dp filter
  minDate: Date;
  maxDate: Date;
  //selectedDate: Date;

  //timeslot
  collectionDayRange: number;
  hasTimeSlots$: Observable<TimeSlotModel[]>;
  timeslots$: Observable<TimeSlotModel[]>;
  selectedTimeSlot: TimeSlotModel;

  formInfo: RegisterModel;

  constructor(private store: Store<AppState>,
    private readonly notificationService: NotificationService,
    private translate: TranslateService,
    private router:Router,
    private registerService:RegisterService,
    private route: ActivatedRoute
  ) { 
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

    // this.model = new PersonalInfoModel();
  }

  ngOnInit(): void {
    //this.ClearAllInput();
    this.GetStores();
    
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const id = Number(params.get('id'));
        if(id)
        {
          this.masterClassId=id;
          this.store.pipe(select(getFormInfo)).subscribe(formInfo => {
            this.formInfo = formInfo;          
            if (this.formInfo != undefined) {
            }
            else{
             this.router.navigate(['register']);
            }
          });      
        }
        else{
          this.router.navigate(['register']);
        }
      });
    
    this.store.dispatch(new ActionGetAllStore());    
    this.locations$ = this.store.pipe(select(getAllStoreList)); 
    this.timeslots$ = this.store.pipe(select(selectFilteredTimeSlots));
    this.hasTimeSlots$ = this.store.pipe(select(selectFilteredHasTimeSlots)); 
    
  }

  ClearAllInput() {
    this.storeLocation = null;
    this.timeSlot = null;
    this.expiredDateTime = null;
    this.selectedLocation = null;
  }
  
  GetStores() {
    this.registerService.getAllStore()
      .subscribe({
        next: (res) => {
          this.locations = res;
          this.locationsList = this.locations.filter(x=>x.storeType==2);
          this.selectedLocation = this.locationsList[0];
          this.selectLocation();
        },
        error: () => {

        }
      })
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
      retriveTimeSlotModel.masterClassId = this.masterClassId;

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


  continue() {
   s_control_click('events,eVar33', 'event45', 'event45, ses_booking:click_continue_button', 'o', 'microsite conversion type');

    let newRegisterModel = new RegisterModel();

    newRegisterModel.firstName = this.formInfo.firstName;
    newRegisterModel.lastName = this.formInfo.lastName;
    newRegisterModel.email = this.formInfo.email;
    newRegisterModel.mobileNumber = this.formInfo.mobileNumber;
    newRegisterModel.expiredDateTime = this.selectedDate;
    newRegisterModel.storeId = this.selectedLocation.id;
    newRegisterModel.productId = this.formInfo.productId;
    newRegisterModel.timeSlotId = this.timeSlot.id;
    newRegisterModel.imageUrl = this.formInfo.imageUrl;
    newRegisterModel.mobileUrl = this.formInfo.mobileUrl;
    newRegisterModel.product = this.formInfo.product;
    newRegisterModel.storeLocation = this.selectedLocation;
    newRegisterModel.timeSlot = this.timeSlot;
    newRegisterModel.type=this.formInfo.type;
    //newRegisterModel.captchaResponse = this.captchaResponse;
    //newRegisterModel.isConsent = this.isConsentGiven;

    this.store.dispatch(
      new ActionSaveFormInfo({ registerModel: newRegisterModel })
    );

    this.router.navigate(['summary']);
    
  }

}
