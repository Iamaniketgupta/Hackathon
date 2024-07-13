import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import asyncHandler from 'express-async-handler';
import nodemailer from "nodemailer";
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// Temporary store for OTPs
const tempUserStore = {};

// Function to generate OTP
function generateOTP(length) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Initiate register endpoint
const initiateRegister = asyncHandler(async (req, res) => {
    const { username, email, password, name, age, lat, long, address, gender } = req.body;

    if (!username || !email || !password || !name ) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new ApiError(400, 'User already exists with this email or username');
    }

    const otp = generateOTP(4);
    // Store user details and OTP
    tempUserStore[email] = { username, password, name, age, lat, long, address, gender, otp };

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Hello! ${name}, It's a verification mail`,
        html: `<strong>Your OTP code is: ${otp}</strong>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json(new ApiResponse(200, email, "OTP sent successfully"));
    } catch (error) {
        throw new ApiError(500, `Error while sending OTP ${error}`);
    }
});

// Verify OTP endpoint
const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    // Check if email and OTP are provided
    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }

    // Check if the OTP exists in the temporary store
    const tempUser = tempUserStore[email];
    if (!tempUser) {
        throw new ApiError(400, "No OTP generated for this email");
    }

    // Verify the OTP
    if (tempUser.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    // After verification, create the user
    const { username, password, name, age, lat, long, address, gender } = tempUser;
    const user = await User.create({ username, email, password, name, age, lat, long, address, gender });

    const accessToken = user.generateAccessToken();
    delete tempUserStore[email]; // Clean up the temporary user data

    res.status(200).json(new ApiResponse(200, { user, accessToken }, "User registered successfully"));
});

// Login endpoint
const login = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    if (!user) {
        throw new ApiError(400, "User doesn't exist");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);
    if (!isPasswordMatch) {
        throw new ApiError(400, "Wrong password");
    }

    const accessToken = user.generateAccessToken();
    res.status(200).json(new ApiResponse(200, { user, accessToken }, "User logged in successfully"));
});

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'User ID is required');
    }

    const user = await User.findById(id).select('-password'); // Exclude password

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    res.status(200).json(new ApiResponse(200, user, 'User retrieved successfully'));
});

// Update profile picture
const updateProfilePicture = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const file = req.file;

    if (!file) {
        throw new ApiError(400, 'No file uploaded');
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    if (user.pfp) {
        await deleteFromCloudinary(user.pfp); // Delete old profile picture
    }

    const uploadResponse = await uploadToCloudinary(file.path);
    if (!uploadResponse) {
        throw new ApiError(500, 'Failed to upload image');
    }

    user.pfp = uploadResponse.secure_url;
    await user.save();

    res.status(200).json(new ApiResponse(200, user, 'Profile picture updated successfully'));
});

// Update coordinates for the authenticated User
const updateCoordinates = asyncHandler(async (req, res) => {
    const { lat, long } = req.body;

    if (lat == null || long == null) {
        throw new ApiError(400, "Latitude and longitude are required");
    }

    const user = req.user;

    user.lat = lat;
    user.long = long;
    await user.save();

    res.status(200).json(new ApiResponse(200, user, "Coordinates updated successfully"));
});

export {
    initiateRegister,
    login,
    verifyOtp,
    getUserById,
    updateProfilePicture,
    updateCoordinates
};