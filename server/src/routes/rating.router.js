import express from 'express';
import { getRatingsByRagPickerUsername, postRatingReview } from '../controllers/ratingController.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyJwt); // Protect all routes below this middleware

router.route('/ragpicker/:username').get(getRatingsByRagPickerUsername);
router.route('/postreview').post(postRatingReview);

export default router;
