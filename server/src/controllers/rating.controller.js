import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Rating from '../models/ratingSchema.js';
import {RagPicker} from '../models/ragPicker.model.js';
import asyncHandler from 'express-async-handler';

// Get all ratings of a RagPicker by username
const getRatingsByRagPickerUsername = asyncHandler(async (req, res) => {
    const { username } = req.params;
    console.log(username);
    if (!username) {    
        throw new ApiError(400, 'RagPicker username is required');
    }
    const ragpicker = await RagPicker.findOne({ username });
    if (!ragpicker) {
        throw new ApiError(404, 'RagPicker not found');
    }
    const ratings = await Rating.find({ ragpickerid: ragpicker._id }).populate("userid");

    res.status(200).json(new ApiResponse(200, ratings, 'Ratings retrieved successfully'));
});


// Add a new rating review by a user
const postRatingReview = asyncHandler(async (req, res) => {
    const { ragpickerid, feedback, ratingstars } = req.body;
    const userid = req.user._id;

    // Validate input
    if (!ragpickerid || !feedback || !ratingstars) {
        return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    // Check if the ragpicker exists
    const ragpickerExists = await RagPicker.findById(ragpickerid);
    if (!ragpickerExists) {
        return res.status(404).json(new ApiError(404, "Ragpicker not found"));
    }

    // Check if the user already submitted a review for the same ragpicker
    const existingRating = await Rating.findOne({ userid, ragpickerid });

    if (existingRating) {
        // Update the existing review
        existingRating.feedback = feedback;
        existingRating.ratingstars = ratingstars;
        await existingRating.save();
        return res.status(200).json(new ApiResponse(200, existingRating, "Rating review updated successfully"));
    } else {
        // Save the new rating
        const rating = new Rating({
            userid,
            ragpickerid,
            feedback,
            ratingstars
        });

        await rating.save();
        return res.status(201).json(new ApiResponse(201, rating, "Rating review added successfully"));
    }
});



export { getRatingsByRagPickerUsername,postRatingReview };
