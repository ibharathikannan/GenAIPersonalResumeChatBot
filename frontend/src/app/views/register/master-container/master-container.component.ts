import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, NotificationService, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { RegisterModel } from '@app/shared/models/register.model';
import { RegisterService } from '@app/shared/services/register.service';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { getFormInfo } from '../register.selectors';
import { ActionSaveFormInfo } from '../register.actions';
import { Helper } from '@app/utils/helper';
import { RetrieveTimeSlotModel } from '@app/shared/models/time-slot.model';
declare function s_control_click(vLinkTrackVars:any, vLinkTrackEvents:any, vLinkTrackValues:any, vType:any, vTypeName:any):any;


@Component({
  selector: 'anms-master-container',
  templateUrl: './master-container.component.html',
  styleUrls: ['./master-container.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterContainerComponent implements OnInit {

  // loading
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  formInfo: RegisterModel;
  categories: any = [];
  categorySelected;
  selectedDate;

  // truncate function
  // to store truncation state for each category
  truncationState: {[key:number ]: boolean } = {}

  getDescription(category: any): string{
    const maxLength = this.truncationState[category.id] ? category.description.length : 175; // number of character limit
    return category.description.substring(0, maxLength) + (maxLength < category.description.length ? ' ...' : '')
  }
  toggleDescription(category: any): void {
    this.truncationState[category.id] = !this.truncationState[category.id];
  }


  constructor(private translate: TranslateService
    , private notification: NotificationService
    , private registerService: RegisterService
    , private store: Store<AppState>
    , private activatedRoute: ActivatedRoute
    , private router: Router) {

  }

  ngOnInit() {
    Helper.trackGaPageView("register", "Sesp-BookingSystem", "SESPBookingSystem");
    Helper.trackAaPageView("register", "Sesp-BookingSystem", "RegisterBooking");

    this.store.pipe(select(getFormInfo)).subscribe(formInfo => {
      this.formInfo = formInfo;
      
      if (this.formInfo != undefined) {
        this.getCategory(this.formInfo.productId);
      }
      else{
       this.router.navigate(['register']);
      }
    });

  }

  getCategory(lookupKey) {
    this.registerService.getProductByParentKey(lookupKey)
    .subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: () => {
        //this.notificationService.error('Error while adding Store TimeSlot');
      },
      complete:() => {
        this.slotCount(this.categories);
      }
    });
  }

  slotCount(categoriesList){
    categoriesList.forEach(cat => {
      cat.disabled=true;

      var retriveTimeSlotModel = new RetrieveTimeSlotModel();
      retriveTimeSlotModel.days = 30;
      retriveTimeSlotModel.storeId = 0;
      retriveTimeSlotModel.masterClassId = cat.id;

      this.registerService.getTimeSlotByMasterClassId(retriveTimeSlotModel)
      .subscribe({
        next: (res) => {
          cat.slotCount=res;
        },
        error: () => {
        }
      })
    })
  }
  
  selectCategory(category) {
    if (category) {
      this.categorySelected = category;
      this.categories.forEach(cat => {
        cat.disabled=true;
      })
      category.disabled=false;
      s_control_click('events,eVar33', 'event45', 'event45, sg:ses_booking:click_samsunglivespace_option', 'o', 'microsite conversion type');  
    }
  }

  Reserve(category) {
    s_control_click('events,eVar33', 'event45', 'event45, ses_booking:click_reserve_button', 'o', 'microsite conversion type');

    let newRegisterModel = new RegisterModel();

    newRegisterModel.firstName = this.formInfo.firstName;
    newRegisterModel.lastName = this.formInfo.lastName;
    newRegisterModel.email = this.formInfo.email;
    newRegisterModel.mobileNumber = this.formInfo.mobileNumber;
    newRegisterModel.expiredDateTime = this.selectedDate;
    newRegisterModel.storeId = 0;
    newRegisterModel.productId = category.lookupKey;
    newRegisterModel.timeSlotId = 0;
    newRegisterModel.imageUrl =category.imageUrl;
    newRegisterModel.productUrl= category.productUrl;
    newRegisterModel.product = category;
    newRegisterModel.storeLocation = '';
    newRegisterModel.timeSlot = '';
    newRegisterModel.type=this.formInfo.type;
  //   //newRegisterModel.captchaResponse = this.captchaResponse;
  //   //newRegisterModel.isConsent = this.isConsentGiven;

    this.store.dispatch(
      new ActionSaveFormInfo({ registerModel: newRegisterModel })
    );

    this.router.navigate(['/register/master/', category.id]);
  }
 
}

export class PersonalInfoModel {
  FirstName: string;
  LastName: string;
  Email: string;
}
