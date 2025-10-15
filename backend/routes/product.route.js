import express from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controller/product.controller.js';
import { adminRoute, protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/getAllProducts', getAllProducts); //This will same for the registered users 
// router.get('/category/:slug', getProductsByCategory);

router.post('/createProduct', protectedRoute, adminRoute, createProduct);
router.delete('/deleteProduct/:id', protectedRoute, adminRoute, deleteProduct);
// router.put('/:id', protectedRoute, adminRoute, updateProduct);


export default router;

