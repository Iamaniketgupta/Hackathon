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

export {
    createBooking
};
