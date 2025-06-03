import express from 'express';
import { createBook } from '../controllers/bookController.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, createBook);

export default router;