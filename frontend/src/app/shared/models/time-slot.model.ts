export class TimeSlotModel {
    id: number;
    slot: number;
    startDateTime: Date;
    endDateTime: Date;
    reservedCount: number;
    storeId: number;
}

export class RetrieveTimeSlotModel {
    days: number;
    storeId: number;
    masterClassId:number;
}