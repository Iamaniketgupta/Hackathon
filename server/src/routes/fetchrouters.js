import { Router } from 'express';
import { getAllRagPicker } from '../controllers/fetch.controller.js';
const router = Router();
router.get('/rp/all',getAllRagPicker)

export default router