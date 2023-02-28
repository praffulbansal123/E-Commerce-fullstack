import createError from "http-errors";
import { Types } from "mongoose";
import { IOrder, IOrderModel } from "../interface/models/order";
import IProduct from "../interface/models/product";
import Order from "../models/orderModel";
import Product from "../models/productModel";

export const createOrderService = async(requestBody: IOrder, userId: Types.ObjectId): Promise<IOrderModel> => {
    try {
        const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = requestBody

        const order: IOrderModel = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            userId: userId
        })

        return order
    } catch (error: any) {
        throw error
    }
}

export const getOrderByIdService = async(orderId: string, userRole: string|undefined, userId: Types.ObjectId): Promise<IOrderModel> => {
    try {
        const order = await Order.findById(orderId).populate('userId', 'name email') as IOrderModel

        if(!order)
            throw new createError.NotFound(`Order with Id: ${orderId} does not exist`)
        
        if(userRole !== 'admin' && userId.toString() !== order.userId._id.toString())
            throw new createError.Unauthorized(`User ${userId} is not authorized to get this order details`)
        
        return order
    } catch (error: any) {
        throw error
    }
}

export const getMyOrdersService = async(userId: Types.ObjectId): Promise<IOrderModel[]> => {
    try {
        const orders = await Order.find({userId: userId}) as IOrderModel[]

        if(orders.length === 0)
            throw new createError.NotFound(`No orders exits for user with id: ${userId}`)

        return orders
    } catch (error: any) {
        throw error
    }
}

export const getAllOrdersService = async () : Promise<IOrderModel[]> => {
    try {
        const orders = await Order.find() as IOrderModel[]

        return orders
    } catch (error: any) {
        throw error
    }
}

const updateStock = async (productId: Types.ObjectId, quantity: number) => {
    const product = await Product.findById(productId) as IProduct

    product.availableStock -= quantity

    await product.save({validateBeforeSave: false})
}

export const updateOrderStatusService = async(orderId: string, status: string) : Promise<void> => {
    try {
        if(!["Processing", "Shipped", "Delivered"].includes(status))
            throw new createError.BadRequest(`Invalid status`)
        
        const order = await Order.findById(orderId)

        if(!order)
            throw new createError.NotFound(`Order with Id: ${orderId} does not exist`)

        if(order.orderStatus === 'Delivered')
            throw new createError.BadRequest('Order has already been delivered')

        if(order.orderStatus === status)
            throw new createError.BadRequest('Order is already up to date')

        order.orderItems.forEach(async (item) => {
            await updateStock(item.productId, item.quantity)
        })

        order.orderStatus = status
        
        if(status === 'Delivered'){
            order.deliveredAt = Date.now().toLocaleString()
        }

        await order.save({validateBeforeSave: false})
        
    } catch (error: any) {
        throw error
    }
}

export const deleteOrderService = async(orderId: string) : Promise<void> => {
    try {
        const order = await Order.findById(orderId)

        if(!order)
            throw new createError.NotFound(`Order with Id: ${orderId} does not exist`)
        
        await order.remove()
    } catch (error: any) {
        throw error
    }
}