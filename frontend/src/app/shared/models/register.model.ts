export class RegisterModel {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    imageUrl:string;
    productUrl:string;
    mobileUrl:string;
    product: any;
    storeLocation:any;
    timeSlot:any;
    expiredDateTime: Date;
    storeId: number;
    productId: number;
    timeSlotId: number;
    bookingType: string;
    captchaResponse: string;
    isConsent: boolean;
    type:number;
  }


  export class ErrorModel {
    status: string;
    timestamp: Date;
    errors: any[];
  }