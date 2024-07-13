import { Router } from 'express';
import {
    createBooking,
    acceptBooking,
    getUnacceptedBookings,
    payForBooking,
    completeBookingByUser,
    cancelBookingByUser,
    cancelBookingByRagPicker
} from '../controllers/booking.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js'; // Use verifyJwt for user authentication
import { verifyRagPickerJwt } from '../middlewares/authRagpicker.middleware.js'; // Use verifyRagPickerJwt for RagPicker authentication

const router = Router();

// Booking routes
router.route("/book").post(verifyJwt, createBooking); // Create a booking
router.route("/accept").post(verifyRagPickerJwt, acceptBooking); // RagPicker accepts a booking
router.route("/unaccepted").get(verifyRagPickerJwt, getUnacceptedBookings); // RagPicker gets all unaccepted bookings
router.route("/pay").post(verifyRagPickerJwt, payForBooking); // Mark a booking as paid

// User routes
router.route("/complete").post(verifyJwt, completeBookingByUser); // User marks booking as completed
router.route("/cancel/user").post(verifyJwt, cancelBookingByUser); // User cancels a booking

// RagPicker routes
router.route("/cancel/ragpicker").post(verifyRagPickerJwt, cancelBookingByRagPicker); // RagPicker cancels a booking

export default router;
