
import express from 'express'
const router = express.Router();
import authController from '../Controllers/authController.js';
import isAuth from '../middleware/isAuthMiddleware.js'

//for register
router.post('/register', authController.registerController)

//for login
router.post('/login', authController.loginController)

//for logout
router.post('/logout', authController.logoutController)

export default router;