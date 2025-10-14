import express from 'express';
import { createProduct, deleteProduct, getAllProducts,getProductsByCategory, updateProduct } from '../controller/product.controller.js';
import { adminRoute, protectedRoute } from './../middleware/auth.middleware.js';

const router = express.Router();

router.get('/getAllProducts', getAllProducts); //This will same for the registered users 
router.get('/category/:slug', getProductsByCategory);

router.post('/createProduct', protectedRoute, adminRoute, createProduct);
router.delete('/deleteProduct/:id', protectedRoute, adminRoute, deleteProduct);
router.put('/:id', protectedRoute, adminRoute, updateProduct);
router.put('/:id', protectedRoute, adminRoute, updateProduct);

// // Wishlist routes
// router.post('/wishlist/add', protectedRoute, addToWishlist);
// router.post('/wishlist/remove', protectedRoute, removeFromWishlist);
// router.get('/wishlist', protectedRoute, getWishlist);


export default router;

