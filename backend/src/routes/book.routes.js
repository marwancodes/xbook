import express from 'express';
import { createBook, getAllBooks, deleteBook } from '../controllers/book.controller.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, createBook);
router.get('/', protectRoute, getAllBooks);
router.delete('/:id', protectRoute, deleteBook);

export default router;