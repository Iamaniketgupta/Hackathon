import { Router } from 'express';
import { createBooking } from '../controllers/booking.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js'; // Use verifyJwt for user authentication

const router = Router();

// Booking route
router.route("/book").post(verifyJwt, createBooking); // Create a booking

export default router;
