export class ProductModel {
    id: number;
    name: string;
    description: string;
}

export class ProductListModel {
    id: number;
    name: string;
    description: string;
    productUrl: string;
    imageUrl: string;
    status: number;
    createdBy: number;
    createdDateTime?: Date;
    isDeleted: boolean;
}