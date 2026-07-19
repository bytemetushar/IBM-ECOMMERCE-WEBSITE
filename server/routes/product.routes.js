import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, syncExternalProducts } from '../controllers/product.controller.js';
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', isLoggedIn, isAdmin, createProduct);
router.post('/sync-external', isLoggedIn, isAdmin, syncExternalProducts);
router.put('/:id', isLoggedIn, isAdmin, updateProduct);
router.delete('/:id', isLoggedIn, isAdmin, deleteProduct);

export default router;
