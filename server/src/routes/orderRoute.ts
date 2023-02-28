import express, {Router} from "express";
import * as OrderController from '../controller/orderController'
import { isAuthenticated, isAuthorized } from '../middleware/auth';

const router: Router = express.Router()

// Create new Order Route
router.post('/order/new', isAuthenticated, OrderController.createOrderHandler)

// Get Order By Id
router.get('/order/:orderId', isAuthenticated, OrderController.getOrderByIdHandler)

// Get All Orders of a User
router.get('/orders/me', isAuthenticated, OrderController.getMyOrdersHandler)

// Get all Orders --Admin
router.get('/admin/orders', isAuthenticated, isAuthorized('admin'), OrderController.getAllOrdersHandler)

// Update Order status --Admin
router.put('/admin/order/:orderId', isAuthenticated, isAuthorized('admin'), OrderController.updateOrderStatusHandler)

// Delete Order Route --Admin
router.delete('/admin/order/:orderId', isAuthenticated, isAuthorized('admin'), OrderController.deleteOrderHandler)

export default router