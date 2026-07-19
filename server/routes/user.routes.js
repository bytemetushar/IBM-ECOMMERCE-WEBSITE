import {Router} from 'express';
import { registerUser, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateUser } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router();


router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', isLoggedIn, getProfile);;
router.post('/reset', forgotPassword);
router.post('/reset:resetToken', resetPassword);
router.post('/change-password', isLoggedIn, changePassword);
router.put('/update/:id', isLoggedIn, updateUser);


export default router;