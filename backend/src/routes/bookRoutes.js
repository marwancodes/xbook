import express from 'express';
import { createBook } from '../controllers/bookController.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', createBook);
// router.get('/', protectRoute, getAllBooks);


export default router;