import { Router } from 'express';
import multer from 'multer';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { login, initiateRegister, verifyOtp, getUserById, updateProfilePicture ,getCurrentUser} from '../controllers/user.controller.js';
import { upload } from "../middlewares/multer.js";
import { updateCoordinates } from '../controllers/ragpicker.controller.js';
const router = Router();

// Registration routes
router.route("/register").post(initiateRegister);
router.route("/verify-otp").post(verifyOtp); // OTP verification route

// Login route
router.route("/login").post(login);
router.route("/update-coordinates").post(verifyJwt , updateCoordinates);
// User routes
router.route("/:id").get(verifyJwt, getUserById); // Get user by ID (protected route)
router.route("/profile-picture").post(verifyJwt, upload.single('profilePicture'), updateProfilePicture); // Update profile picture (protected route)

router.get("/v/getCurrentUser" , verifyJwt, getCurrentUser)
export default router;
