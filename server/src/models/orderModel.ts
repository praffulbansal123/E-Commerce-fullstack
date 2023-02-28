import { model, Schema, Types } from "mongoose";
import { IOrderModel } from "../interface/models/order";

export const orderItem: Schema = new Schema ({
    name: {
        type: String,
        required: [true, 'Please enter Product Name'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please enter Product Description'],
        maxLength: [8, 'Price can not exceed 8 characters'],
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    productId: {
        type: Types.ObjectId,
        ref: "Product",
        required: true
    }
})

export const shippingInfo: Schema = new Schema({
    address: {
        type: String,
        required: [true, "Please provide an address"],
        minLength: [3, "Address cannot be shorter than 3 characters"]
    },
    city: {
        type: String,
        required: [true, "Please provide City name"],
        minLength: [3, "Ciry name cannot be shorter than 3 characters"]
    },
    state: {
        type: String,
        required: [true, "Please provide State Name"],
        minLength: [3, "State Name cannot be shorter than 3 characters"]
    },
    country: {
        type: String,
        required: [true, "Please provide Country Name"],
        minLength: [3, "Country Name cannot be shorter than 3 characters"],
        default: "India"
    },
    pincode: {
        type: Number,
        required: [true, "Please provide Pin Code"],
        match: [/^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/, "Please enter valid PinCode"]
    }
}, {_id: false})

export const paymentInfo: Schema = new Schema ({
    id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Processing", "Approved", "Failed"],
        default: "Approved"
    }
}, {_id: false})

export const orderSchema: Schema = new Schema({
    shippingInfo: {
        type: shippingInfo,
        required: [true, 'Please provide Shipping Info']
    },
    orderItems: {
        type: [orderItem],
        minItems: [1, 'Should have at least 1 order item'],
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentInfo: {
        type: paymentInfo,
        required: [true, 'Please provide Payment Info']
    },
    paidAt:{
        type: Date,
        required: true,
        default: Date.now()
    },
    itemsPrice: {
        type: Number,
        default: 0
    },
    taxPrice: {
        type: Number,
        default: 0
    },
    shippingPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered"],
        default: "Processing"
    },
    deliveredAt: Date
}, {timestamps: true})

// Creating Order Model
const Order = model<IOrderModel>('Order', orderSchema);

export default Order;