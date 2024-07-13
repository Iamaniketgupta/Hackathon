import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import asyncHandler from 'express-async-handler';

const register = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new ApiError(400, 'User already exists with this email or username');
    }

    // Create a new user
    const user = new User({ name, username, email, password });
    await user.save();

    // Generate access token
    const token = user.generateAccessToken();

    res.status(201).json(new ApiResponse(201, 'User registered successfully', { user, token }));
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, 'Invalid email or password');
    }

    // Check if password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, 'Invalid email or password');
    }

    // Generate access token
    const token = user.generateAccessToken();

    res.status(200).json(new ApiResponse(200, 'User logged in successfully', { user, token }));
});

export { register, login };
