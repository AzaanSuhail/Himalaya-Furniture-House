import express from 'express';
import { createProduct, deleteProduct, getAllProducts, addToWishlist, removeFromWishlist, getWishlist } from '../controller/product.controller.js';
import { adminRoute, protectedRoute } from './../middleware/auth.middleware.js';

const router = express.Router();

router.get('/getAllProducts', getAllProducts); //This will same for the registered users 
// router.post('/createProduct', protectedRoute, adminRoute, createProduct); //LEARN :make this route protected + admin route
router.post('/createProduct',  createProduct); //LEARN :make this route protected + admin route
router.delete('/deleteProduct/:id', protectedRoute, adminRoute, deleteProduct);

// Wishlist routes
router.post('/wishlist/add', protectedRoute, addToWishlist);
router.post('/wishlist/remove', protectedRoute, removeFromWishlist);
router.get('/wishlist', protectedRoute, getWishlist);


export default router;

