
import express from 'express'
const router = express.Router();
import transControllers from '../Controllers/transController.js';
import isAuth from '../middleware/isAuthMiddleware.js';

//for register
router.post('/FetchTransection', isAuth, transControllers.allTransection)

//for login
router.post('/add-transection', isAuth, transControllers.addTransection)



export default router;