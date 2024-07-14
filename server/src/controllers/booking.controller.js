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
    const booking = await Booking.findById(bookingId).populate('user');
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Check if the booking belongs to the authenticated RagPicker
    if (booking.ragPicker.toString() !== ragPickerId.toString()) {
        throw new ApiError(403, "You are not authorized to accept this booking");
    }

    // Update the booking
    booking.status = "accepted";
    booking.isAccepted = true;
    await booking.save();

    res.status(200).json(new ApiResponse(200, booking, "Booking accepted successfully"));
});

// Get all unaccepted bookings for a RagPicker
const getUnacceptedBookings = asyncHandler(async (req, res) => {
    const ragPickerId = req.ragPicker._id; // Assuming you have RagPicker authenticated and their info in req.ragPicker

    // Find all unaccepted bookings for the authenticated RagPicker
    const bookings = await Booking.find({ ragPicker: ragPickerId, isAccepted: false }).populate("user");

    if (!bookings) {
        throw new ApiError(404, "No unaccepted bookings found");
    }

    res.status(200).json(new ApiResponse(200, bookings, "Unaccepted bookings retrieved successfully"));
});
// Mark a booking as paid
const payForBooking = asyncHandler(async (req, res) => {
    const { bookingId } = req.body;
    const ragPickerId = req.ragPicker._id; // Assuming you have RagPicker authenticated and their info in req.ragPicker

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Check if the booking belongs to the authenticated RagPicker
    if (booking.ragPicker.toString() !== ragPickerId.toString()) {
        throw new ApiError(403, "You are not authorized to mark this booking as paid");
    }

    // Update the booking
    booking.isPaid = true;
    await booking.save();

    res.status(200).json(new ApiResponse(200, booking, "Booking marked as paid successfully"));
});

// Mark a booking as completed by the user
const completeBookingByUser = asyncHandler(async (req, res) => {
    const { bookingId } = req.body;
    const userId = req.user._id; // Assuming you have user authenticated and their info in req.user

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Check if the booking belongs to the authenticated user
    if (booking.user.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to complete this booking");
    }

    // Update the booking status to completed
    booking.status = "completed";
    await booking.save();

    res.status(200).json(new ApiResponse(200, booking, "Booking marked as completed successfully"));
});

// Cancel a booking by the user
const cancelBookingByUser = asyncHandler(async (req, res) => {
    const { bookingId } = req.body;
    const userId = req.user._id; // Assuming you have user authenticated and their info in req.user

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Check if the booking belongs to the authenticated user
    if (booking.user.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to cancel this booking");
    }

    // Update the booking status to canceled
    booking.status = "canceled";
    await booking.save();

    res.status(200).json(new ApiResponse(200, booking, "Booking canceled successfully"));
});

// Cancel a booking by the RagPicker
const cancelBookingByRagPicker = asyncHandler(async (req, res) => {
    const { bookingId } = req.body;
    const ragPickerId = req.ragPicker._id; // Assuming you have RagPicker authenticated and their info in req.ragPicker

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Check if the booking belongs to the authenticated RagPicker
    if (booking.ragPicker.toString() !== ragPickerId.toString()) {
        throw new ApiError(403, "You are not authorized to cancel this booking");
    }

    // Update the booking status to canceled
    booking.status = "canceled";
    await booking.save();

    res.status(200).json(new ApiResponse(200, booking, "Booking canceled successfully"));
});

// Fetch all bookings of a ragpicker
const getAllBookingsOfRagPicker = asyncHandler(async (req, res) => {
    const { ragPickerId } = req.params;

    // Check if the RagPicker exists
    const ragPicker = await RagPicker.findById(ragPickerId);
    if (!ragPicker) {
        throw new ApiError(404, "Rag Picker not found");
    }

    // Find all bookings for the specified RagPicker
    const bookings = await Booking.find({ ragPicker: ragPickerId });

    if (!bookings) {
        throw new ApiError(404, "No bookings found");
    }

    res.status(200).json(new ApiResponse(200, bookings, "Bookings retrieved successfully"));
});

// Fetch all completed bookings
const getAllCompletedBookings = asyncHandler(async (req, res) => {
    const { ragPickerId } = req.params;

    // Check if the RagPicker exists
    const ragPicker = await RagPicker.findById(ragPickerId);
    if (!ragPicker) {
        throw new ApiError(404, "Rag Picker not found");
    }

    // Find all completed bookings for the specified RagPicker
    const bookings = await Booking.find({ ragPicker: ragPickerId, status: "completed" }).populate('user');

    if (!bookings) {
        throw new ApiError(404, "No completed bookings found");
    }

    res.status(200).json(new ApiResponse(200, bookings, "Completed bookings retrieved successfully"));
});

// Fetch total money earned by a RagPicker from paid bookings
const getTotalMoneyEarned = asyncHandler(async (req, res) => {
    const { ragPickerId } = req.params;

    // Check if the RagPicker exists
    const ragPicker = await RagPicker.findById(ragPickerId);
    if (!ragPicker) {
        throw new ApiError(404, "Rag Picker not found");
    }

    // Find all paid bookings for the RagPicker
    const paidBookings = await Booking.find({ ragPicker: ragPickerId, isPaid: true });

    // Calculate the total money earned
    const totalMoney = paidBookings.reduce((sum, booking) => sum + booking.payment, 0);

    res.status(200).json(new ApiResponse(200, { totalMoney }, "Total money earned retrieved successfully"));
});


export {
    createBooking,
    acceptBooking,
    getUnacceptedBookings,
    payForBooking,
    completeBookingByUser,
    cancelBookingByUser,
    cancelBookingByRagPicker,
    getAllBookingsOfRagPicker,
    getAllCompletedBookings,
    getTotalMoneyEarned
};