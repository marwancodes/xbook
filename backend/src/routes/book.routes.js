import express from 'express';
import { createBook, getAllBooks, deleteBook, getUserBooks } from '../controllers/book.controller.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, createBook);
router.get('/', protectRoute, getAllBooks);
router.delete('/:id', protectRoute, deleteBook);

router.get('/user', protectRoute, getUserBooks);

export default router;