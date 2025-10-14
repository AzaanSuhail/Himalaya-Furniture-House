import express from 'express';
import { login, logout, signup, me } from '../controller/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protectedRoute, me);


export default router;