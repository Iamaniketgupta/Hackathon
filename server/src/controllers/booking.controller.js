import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.model.js";
import { RagPicker } from "../models/ragPicker.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from 'express-async-handler';

// Create a new booking
const createBooking = asyncHandler(async (req, res) => {
    const { ragPickerId, timeSlot, payment } = req.body;
    const userId = req.user._id; // Assuming you have user authenticated and their info in req.user

    if (!ragPickerId || !timeSlot || !payment) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the RagPicker exists
    const ragPicker = await RagPicker.findById(ragPickerId);
    if (!ragPicker) {
        throw new ApiError(404, "Rag Picker not found");
    }

    // Check if the User exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Create a new booking
    const booking = new Booking({
        user: userId,
        ragPicker: ragPickerId,
        timeSlot,
        payment
    });

    await booking.save();

    res.status(201).json(new ApiResponse(201, booking, "Booking created successfully"));
});

// Accept a booking
const acceptBooking = asyncHandler(async (req, res) => {
    const { bookingId } = req.body;
    const ragPickerId = req.ragPicker._id; // Assuming you have RagPicker authenticated and their info in req.ragPicker

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Check if the booking belongs to the authenticated RagPicker
    if (booking.ragPicker.toString() !== ragPickerId.toString()) {
        throw new ApiError(403, "You are not authorized to accept this booking");
    }

    // Update the booking
    booking.isAccepted = true;
    await booking.save();

    res.status(200).json(new ApiResponse(200, booking, "Booking accepted successfully"));
});

// Get all unaccepted bookings for a RagPicker
const getUnacceptedBookings = asyncHandler(async (req, res) => {
    const ragPickerId = req.ragPicker._id; // Assuming you have RagPicker authenticated and their info in req.ragPicker

    // Find all unaccepted bookings for the authenticated RagPicker
    const bookings = await Booking.find({ ragPicker: ragPickerId, isAccepted: false });

    if (!bookings) {
        throw new ApiError(404, "No unaccepted bookings found");
    }

    res.status(200).json(new ApiResponse(200, bookings, "Unaccepted bookings retrieved successfully"));
});

export {
    createBooking,
    acceptBooking,
    getUnacceptedBookings
};
