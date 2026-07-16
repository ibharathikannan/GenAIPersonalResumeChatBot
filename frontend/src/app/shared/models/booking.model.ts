import { ProductModel } from "./product.model";
import { StoreModel } from "./store.model";
import { TimeSlotModel } from "./time-slot.model";

export class BookingModel {
    id: number;
    status: number;
    refNumber: string;
    firstName: string;
    lastName: string;
    expiredDateTime: Date;
    store: StoreModel;
    product: ProductModel;
    timeSlot: TimeSlotModel;
}

