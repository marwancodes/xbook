import express from 'express';
import { loginUser, registerUser, logout } from '../controllers/auth.controller.js';


const router = express.Router();


router.post('/register', registerUser);
router.post('/logout', logout);
router.post('/login', loginUser);



export default router;