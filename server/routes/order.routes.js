import { Router } from 'express';
import { addOrderItems, getOrderById, getMyOrders, getOrders } from '../controllers/order.controller.js';
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', isLoggedIn, addOrderItems);
router.get('/myorders', isLoggedIn, getMyOrders);
router.get('/:id', isLoggedIn, getOrderById);
router.get('/', isLoggedIn, isAdmin, getOrders);

export default router;
