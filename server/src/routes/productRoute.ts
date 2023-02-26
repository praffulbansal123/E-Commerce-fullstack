import express, { Router } from 'express';
import * as ProductController from '../controller/productController';
import { isAuthenticated, isAuthorized } from '../middleware/auth';

const router:Router = express.Router();

// Register, it should be protected
router.post('/admin/product/new', isAuthenticated, isAuthorized('admin'), ProductController.createProductHandler);

// Fetched products with filter conditions
router.get('/products', ProductController.getAllProductHandler)

// Update product route
router.put('/admin/product/:productId', isAuthenticated, isAuthorized('admin'), ProductController.updateProductHandler)

// Deletre product route
router.delete('/admin/product/:productId', isAuthenticated, isAuthorized('admin'), ProductController.deleteProductHandler)

// Create or Update Review route
router.put('/review', isAuthenticated, ProductController.createProductReviewHandler)

// Get All Reviews of a product route
router.get('/reviews', ProductController.getAllReviewByProductIdHandler)

// Delete a Review route
router.delete('/reviews', isAuthenticated, ProductController.deleteReviewHandler)

export default router;