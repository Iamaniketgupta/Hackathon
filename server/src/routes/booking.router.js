import { Router } from 'express';
import { createBooking, acceptBooking, getUnacceptedBookings } from '../controllers/booking.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js'; // Use verifyJwt for user authentication
import { verifyRagPickerJwt } from '../middlewares/authRagpicker.middleware.js'; // Use verifyRagPickerJwt for RagPicker authentication

const router = Router();

// Booking routes
router.route("/book").post(verifyJwt, createBooking); // Create a booking
router.route("/accept").post(verifyRagPickerJwt, acceptBooking); // RagPicker accepts a booking
router.route("/unaccepted").get(verifyRagPickerJwt, getUnacceptedBookings); // RagPicker gets all unaccepted bookings

export default router;
