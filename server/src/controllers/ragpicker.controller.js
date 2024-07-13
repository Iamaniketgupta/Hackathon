import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { RagPicker } from "../models/ragPicker.model.js"; // Import the RagPicker model
import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import { uploadToCloudinary, deleteFromCloudinary, publicId } from '../utils/cloudinary.js';
import jwt from "jsonwebtoken";

const tempRagPickerStore = {}; // Temporary store for OTP
console.log(tempRagPickerStore)
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
        rejectUnauthorized: false,
    },
});

// Initiate registration for RagPicker
const initiateRagPickerRegistration = asyncHandler(async (req, res) => {
    const { name, age, address, lat, long, gender, pricePerHour, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the username or email already exists
    const existingUser = await RagPicker.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        if (existingUser.username === username) {
            throw res.status(400).json({message:"Username is not available Try unique username"});
        }
        if (existingUser.email === email) {
            throw res.status(400).json({message:"Email Already Exists"});
        }
    }

    const otp = generateOTP(4);
    tempRagPickerStore[email] = { name, age, address, lat, long, gender, pricePerHour, username, email, password, otp };

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Verification OTP`,
        html: `<strong>Your OTP code is: ${otp}</strong>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json(new ApiResponse(200, email, "OTP sent successfully"));
    } catch (error) {
        throw new ApiError(500, `Error while sending OTP: ${error.message}`);
    }
});


// Verify OTP and create RagPicker
const verifyRagPickerOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }

    console.log("otp : " ,otp)

    const tempRagPicker = {...tempRagPickerStore[email]};
console.log(tempRagPicker.otp)
    if (!tempRagPicker || tempRagPicker.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    const newRagPicker = new RagPicker(tempRagPicker);
    await newRagPicker.save();
    delete tempRagPickerStore[email]; // Remove from temporary store

    // Generate access token
    const accessToken = newRagPicker.generateAccessToken();

    res.status(201).json(new ApiResponse(201, { newRagPicker, accessToken }, "Account created successfully"));
});

// Login controller
const login = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const ragPicker = await RagPicker.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    if (!ragPicker) {
        throw new ApiError(400, "RagPicker doesn't exist");
    }

    const isPasswordMatch = await ragPicker.isPasswordCorrect(password);
    if (!isPasswordMatch) {
        throw new ApiError(400, "Wrong password");
    }

    // Generate access token
    const accessToken = ragPicker.generateAccessToken();

    res.status(200).json(new ApiResponse(200, { ragPicker, accessToken }, "RagPicker logged in successfully"));
});

// Get the authenticated RagPicker
const getRagPickerById = asyncHandler(async (req, res) => {
    const ragPicker = req.ragPicker;

    res.status(200).json(new ApiResponse(200, ragPicker, "Rag Picker retrieved successfully"));
});

// Update the authenticated RagPicker
const updateRagPicker = asyncHandler(async (req, res) => {
    const updates = req.body;

    const ragPicker = await RagPicker.findByIdAndUpdate(req.ragPicker._id, updates, { new: true, runValidators: true });
    if (!ragPicker) {
        throw new ApiError(404, "Rag Picker not found");
    }

    res.status(200).json(new ApiResponse(200, ragPicker, "Rag Picker updated successfully"));
});

// Update Profile Picture
const updateProfilePicture = asyncHandler(async (req, res) => {
    const file = req.file;

    if (!file) {
        throw new ApiError(400, 'No file uploaded');
    }

    const ragPicker = req.ragPicker;

    if (ragPicker.pfp) {
        const existingPublicId = await publicId(ragPicker.pfp);
        await deleteFromCloudinary(existingPublicId);
    }

    const uploadResponse = await uploadToCloudinary(file.path);
    if (!uploadResponse) {
        throw new ApiError(500, 'Failed to upload image');
    }

    ragPicker.pfp = uploadResponse.secure_url;
    await ragPicker.save();

    res.status(200).json(new ApiResponse(200, ragPicker, 'Profile picture updated successfully'));
});

// Delete the authenticated RagPicker
const deleteRagPicker = asyncHandler(async (req, res) => {
    const ragPicker = await RagPicker.findByIdAndDelete(req.ragPicker._id);
    if (!ragPicker) {
        throw new ApiError(404, "Rag Picker not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Rag Picker deleted successfully"));
});

// Add a review to the authenticated RagPicker
const addReview = asyncHandler(async (req, res) => {
    const { review, rating } = req.body; // Review and rating from user

    if (!review || rating == null) {
        throw new ApiError(400, "Review and rating are required");
    }

    const ragPicker = req.ragPicker;

    // Add review to the rag picker
    ragPicker.reviews.push({ review, rating });

    // Update the ratings (simple average)
    const totalRatings = ragPicker.reviews.reduce((acc, r) => acc + r.rating, 0);
    ragPicker.ratings = totalRatings / ragPicker.reviews.length;

    await ragPicker.save();

    res.status(200).json(new ApiResponse(200, ragPicker, "Review added successfully"));
});

// Middleware to verify JWT for RagPicker
const verifyRagPickerJwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body?.token || req.body.headers?.Authorization?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const ragPicker = await RagPicker.findById(decodedToken._id).select("-password");

        if (!ragPicker) {
            throw new ApiError(401, "Invalid token");
        }

        req.ragPicker = ragPicker;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export {
    initiateRagPickerRegistration,
    verifyRagPickerOTP,
    getRagPickerById,
    updateRagPicker,
    updateProfilePicture,
    deleteRagPicker,
    addReview,
    login,
    verifyRagPickerJwt
};
