import { Router } from 'express';
import { 
    initiateRagPickerRegistration, 
    verifyRagPickerOTP, 
    getRagPickerById, 
    updateRagPicker, 
    updateProfilePicture, 
    deleteRagPicker, 
    addReview,
    login 
} from '../controllers/ragpicker.controller.js';
const router = Router();

import { upload } from "../middlewares/multer.js";
import { verifyRagPickerJwt } from '../middlewares/authRagpicker.middleware.js';

// Registration routes
router.route("/register").post(initiateRagPickerRegistration);
router.route("/verify-otp").post(verifyRagPickerOTP); 
router.route("/login").post(login);

// RagPicker routes
router.route("/get").get(verifyRagPickerJwt, getRagPickerById); // Get authenticated RagPicker
router.route("/update").put(verifyRagPickerJwt, updateRagPicker); // Update authenticated RagPicker
router.route("/delete").delete(verifyRagPickerJwt, deleteRagPicker); // Delete authenticated RagPicker

router.route("/profile-picture").post(verifyRagPickerJwt, upload.single('profilePicture'), updateProfilePicture); // Update Profile Picture
router.route("/review").post(verifyRagPickerJwt, addReview); // Add Review to authenticated RagPicker

export default router;
