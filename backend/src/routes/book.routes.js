import express from 'express';
import { createBook, getAllBooks } from '../controllers/book.controller.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, createBook);
router.get('/', protectRoute, getAllBooks);


export default router;