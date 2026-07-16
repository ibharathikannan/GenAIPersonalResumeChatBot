import { ProductModel } from "./product.model";
import { StoreModel } from "./store.model";

export class StockAlertModel {
    id: number;
    refNumber: string;
    email: string;
    mobileNumber: string;
    firstName: string;
    lastName: string;
    store: StoreModel;
    product: ProductModel;
}

export class StockAlertSubmissionRequest {
    email: string;
    mobileNumber: string;
    firstName: string;
    lastName: string;
    isConsent: boolean;
    storeId: number;
    productId: number;
    captchaResponse: string;
}
