import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Rating from '../models/ratingSchema.js';
import { RagPicker } from '../models/ragPicker.model.js';
import asyncHandler from 'express-async-handler';

// Get all ratings of a RagPicker by username
const getRatingsByRagPickerUsername = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username) {
        throw new ApiError(400, 'RagPicker username is required');
    }

    const ragpicker = await RagPicker.findOne({ username });

    if (!ragpicker) {
        throw new ApiError(404, 'RagPicker not found');
    }

    const ratings = await Rating.find({ ragpickerid: ragpicker._id });

    res.status(200).json(new ApiResponse(200, ratings, 'Ratings retrieved successfully'));
});

// Add a new rating review by a user and update RagPicker's average rating
const postRatingReview = asyncHandler(async (req, res) => {
    const { ragpickerid, feedback, ratingstars } = req.body;
    const userid = req.user._id;

    if (!ragpickerid || !feedback || !ratingstars) {
        throw new ApiError(400, "All fields are required");
    }

    // Save the new rating review
    const rating = new Rating({
        userid,
        ragpickerid,
        feedback,
        ratingstars
    });

    await rating.save();

    // Fetch all ratings for the RagPicker
    const ratings = await Rating.find({ ragpickerid });

    // Calculate the mean (average) rating
    const totalRatings = ratings.length;
    const totalStars = ratings.reduce((sum, rating) => sum + rating.ratingstars, 0);
    const averageRating = totalStars / totalRatings;

    // Update the RagPicker's rating
    await RagPicker.findByIdAndUpdate(ragpickerid, { rating: averageRating });

    res.status(201).json(new ApiResponse(201, rating, "Rating review added and RagPicker's rating updated successfully"));
});

export { getRatingsByRagPickerUsername, postRatingReview };
