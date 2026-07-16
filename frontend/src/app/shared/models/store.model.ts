export class StoreModel {
    id: number;
    name: string;
    description: string;
    addressLine1: string;
    addressLine2: string;
}

export class StoreListModel {
    id: number;
    name: string;
    description?: string;
    status?: number;
    locationUrl?:string;
    addressLine1?: string;
    addressLine2?: string;
    createdBy?: number;
    createdDate?: Date;
    isDeleted?: boolean;
}