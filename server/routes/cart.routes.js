import { Router } from 'express';
import { getCart, syncCart, clearCart } from '../controllers/cart.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', isLoggedIn, getCart);
router.post('/sync', isLoggedIn, syncCart);
router.delete('/clear', isLoggedIn, clearCart);

export default router;
