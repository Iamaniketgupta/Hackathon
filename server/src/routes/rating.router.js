import express from 'express';
import { getRatingsByRagPickerUsername, postRatingReview } from '../controllers/rating.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/ragpicker/:username').get(getRatingsByRagPickerUsername);
router.route('/postreview').post(verifyJwt,postRatingReview);

export default router; 
