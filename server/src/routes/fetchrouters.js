import { Router } from 'express';
import { getAllBookings, getAllRagPicker } from '../controllers/fetch.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js'; // Use verifyJwt for user authentication

const router = Router();
router.get('/rp/all',getAllRagPicker)


router.get('/bookings/all',verifyJwt,getAllBookings)

export default router