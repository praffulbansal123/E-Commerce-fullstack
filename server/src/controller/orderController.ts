import { Request, Response, NextFunction, RequestHandler} from 'express';
import { Types } from 'mongoose';
import { IOrder, IOrderModel } from '../interface/models/order';
import logger from '../logger/logger';
import { IRequest } from '../middleware/auth';
import { createOrderService, getOrderByIdService, getMyOrdersService, getAllOrdersService, updateOrderStatusService, deleteOrderService } from '../services/orderService';

// Creating New Order
export const createOrderHandler: RequestHandler = async(req: IRequest, res: Response, next: NextFunction) => {
    try {
        const requestBody: IOrder = req.body

        const userId: Types.ObjectId = req.user? req.user._id : undefined

        const order: IOrderModel = await createOrderService(requestBody, userId)

        res.status(201).send({status: true, messsage: 'Order created Sucessfully', order})
    } catch (error: any) {
        logger.info(error.message)
        next(error)
    }
}

// Getting Order By ID
export const getOrderByIdHandler: RequestHandler = async(req: IRequest, res: Response, next: NextFunction) => {
    try {
        const orderId: string = req.params.orderId

        const userRole: string|undefined = req.user? req.user.role : undefined

        const userId: Types.ObjectId = req.user? req.user._id : undefined

        const orderDetails: IOrderModel = await getOrderByIdService(orderId, userRole, userId)

        res.status(200).send({status: true, messsage: 'Order Details fetched Successfully', order: orderDetails})
        
    } catch (error: any) {
        logger.info(error.message)
        next(error)
    }
}

// Getting All Orders of Logged In User
export const getMyOrdersHandler: RequestHandler = async(req: IRequest, res: Response, next: NextFunction) => {
    try {
        const userId: Types.ObjectId = req.user? req.user._id : undefined

        const orderDetails: IOrderModel[] = await getMyOrdersService(userId)

        res.status(200).send({status: true, numOfOrders: orderDetails.length, order: orderDetails})
        
    } catch (error: any) {
        logger.info(error.message)
        next(error)
    }
}

// Get All Orders --Admin
export const getAllOrdersHandler: RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const orders: IOrderModel[] = await getAllOrdersService()

        const totalAmount: number = orders.reduce((sum, order) => {
            sum += order.totalPrice
            return sum
        }, 0 as number)

        res.status(200).send({status: true, numOfOrders: orders.length, totalAmount, orders})
    } catch (error: any) {
        logger.info(error.message)
        next(error)
    }
}

// Update Order Status --Admin
export const updateOrderStatusHandler: RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId: string = req.params.orderId

        const status: string = req.body.status

        await updateOrderStatusService(orderId, status)

        res.status(200).send({status: true, message: 'Order Status updated'})
    } catch (error: any) {
        logger.info(error.message)
        next(error)
    }
}

// Delete Order --Admin
export const deleteOrderHandler: RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const orderId: string = req.params.orderId

        await deleteOrderService(orderId)

        res.status(200).send({status: true, message: 'Order deleted'})
    } catch (error: any) {
        logger.info(error.message)
        next(error)
    }
}