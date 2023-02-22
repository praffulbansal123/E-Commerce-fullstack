import express, { Router } from 'express';
import * as ProductController from '../controller/productController';
import { isAuthenticated, isAuthorized } from '../middleware/auth';

const router:Router = express.Router();

// Register, it should be protected
router.post('/new', isAuthenticated, isAuthorized('admin'), ProductController.createProductHandler);

// Fetched products with filter conditions
router.get('/get', ProductController.getAllProductHandler)

// Update product route
router.put('/:productId', isAuthenticated, isAuthorized('admin'), ProductController.updateProductHandler)

// Deletre product route
router.delete('/:productId', isAuthenticated, isAuthorized('admin'), ProductController.deleteProductHandler)

export default router;