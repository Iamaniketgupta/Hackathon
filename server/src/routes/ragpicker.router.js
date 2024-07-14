import { Router } from 'express';
import { 
    initiateRagPickerRegistration, 
    verifyRagPickerOTP, 
    getRagPickerById, 
    updateRagPicker, 
    updateProfilePicture, 
    deleteRagPicker, 
    addReview,
    login ,
    getRagPicker,
    updateCoordinates,
    getRagPickerByUsername
} from '../controllers/ragpicker.controller.js';
const router = Router();

import { upload } from "../middlewares/multer.js";
import { verifyRagPickerJwt } from '../middlewares/authRagpicker.middleware.js';

// Registration routes
router.route("/register").post(initiateRagPickerRegistration);
router.route("/verify-otp").post(verifyRagPickerOTP); 
router.route("/login").post(login);

// RagPicker routes
router.route("/get").get(verifyRagPickerJwt, getRagPicker); // Get authenticated RagPicker
router.route("/update").put(verifyRagPickerJwt, updateRagPicker); // Update authenticated RagPicker
router.route("/delete").delete(verifyRagPickerJwt, deleteRagPicker); // Delete authenticated RagPicker

router.route("/profile-picture").post(verifyRagPickerJwt, upload.single('profilePicture'), updateProfilePicture); // Update Profile Picture
router.route("/review").post(verifyRagPickerJwt, addReview); // Add Review to authenticated RagPicker
router.route("/update-coordinates").post( updateCoordinates);
router.route("/username/:username").get(getRagPickerByUsername); // Get RagPicker by username

router.get('/:id', getRagPickerById);
export default router;
