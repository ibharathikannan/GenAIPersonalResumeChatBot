import { BaseService } from './base/base.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';
import { StockAlertModel, StockAlertSubmissionRequest } from '../models/stock-alert.model';
import { RetrieveTimeSlotModel } from '../models/time-slot.model';

@Injectable({
    providedIn: 'root'
})
export class RegisterService extends BaseService {
    private service: string;

    headers = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    };

    constructor(private readonly http: HttpClient) {
        super();
        this.service = this.api + 'api/BookingService';
    }

    isEmailValid(email: string) {
      const obj = {
        email: email
      };
      return this.http.post<boolean>(
        `${this.service}/IsValidEmail`,
        obj
      );
    }

    generateBookingSummaryInfo(formData: any) {
      const obj = {
        productId: formData.productId,
        storeId: formData.storeId,
        timeSlotId: formData.timeSlotId
      };
      return this.http.post<any>(
        `${this.service}/GenerateBookingSummaryInfo`, obj
      );
    }

    getProductList() {
      return this.http.post<any>(
        `${this.service}/GetProducts`, {}
      );
    }

    getAppointmentType() {
      return this.http.post<any>(`${this.service}/GetAppointmentType`, {});
    }
    getProductByParentKey(lookupKey: string) {
      return this.http.post<any>(
        `${this.service}/GetProductByParentKey?lookupKey=${lookupKey}`, null
      );
    }

    getStoreList(productId: number) {
      return this.http.post<any>(
        `${this.service}/GetStores?productId=${productId}`, null
      );
    }

    getAllStore() {
      return this.http.post<any>(`${this.service}/GetAllStores`, {});
    }

    
    getTimeSlotByStore(timeSlotrequestObj: RetrieveTimeSlotModel) {
      return this.http.post<any>(`${this.service}/GetTimeSlotsByStore`, timeSlotrequestObj);
    }

    getTimeSlotByMasterClassId(timeSlotrequestObj: RetrieveTimeSlotModel) {
      return this.http.post<any>(`${this.service}/GetTimeSlotsByMasterClassId`, timeSlotrequestObj);
    }
    

    submitBooking(register: RegisterModel) {
        return this.http.post(`${this.service}/Save`, register);
    }

    submitStockAlert(stockAlert: StockAlertSubmissionRequest) {
      return this.http.post(`${this.service}/SaveStockAlert`, stockAlert);
    }

    getStockAlert(refNumber: string) {
      return this.http.post<any>(
        `${this.service}/GetStockAlertByRef?stockAlertRef=${refNumber}`, null
      );
    }

  
}