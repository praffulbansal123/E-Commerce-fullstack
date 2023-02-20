import express, { Router } from 'express';
import * as ProductController from '../controller/productController';

const router:Router = express.Router();

// Register, it should be protected
router.post('/create', ProductController.createProductHandler);

// Fetched products with filter conditions
router.get('/get', ProductController.getAllProductHandler)

// Update product route
router.put('/:productId', ProductController.updateProductHandler)

// Deletre product route
router.delete('/:productId', ProductController.deleteProductHandler)

export default router;