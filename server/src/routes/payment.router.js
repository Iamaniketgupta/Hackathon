import { Router } from 'express';
import {createOrder,verifyOrder} from '../controllers/payment.controllers.js';
import { verifyJwt } from '../middlewares/auth.middleware.js'; // Use verifyJwt for user authentication

const router = Router();
router.route("/create_order").post(verifyJwt, createOrder);
router.route("/verify_order").post(verifyOrder);

export default router;
