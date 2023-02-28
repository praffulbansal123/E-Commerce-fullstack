import { Types, Document } from "mongoose";

export interface IOrderItem {
    name: string,
    price: number,
    quantity: number,
    image: string,
    productId: Types.ObjectId
}

export interface IShippingInfo {
    address: string,
    city: string,
    state: string,
    country: string,
    pincode: number
}

export interface IOrder {
    shippingInfo: IShippingInfo,
    orderItems: Array<IOrderItem>,
    paymentInfo: {
        id: string,
        status: string
    },
    paidAt?: Date,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    orderStatus?: string,
}

export interface IOrderModel extends IOrder, Document {
    userId: Types.ObjectId,
    deliveredAt?: string | Date,
}