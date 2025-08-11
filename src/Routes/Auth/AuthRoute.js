import * as AuthController from '../../Controllers/Auth/AuthController.js';
import express from 'express';
const router = express.Router();


// Route to register a new user
router.post('/register', AuthController.registerUser);
// Route to verify OTP for a user
router.post('/verify-otp', AuthController.verifyOTP);
// Route to set a password for a user
router.post('/set-password', AuthController.setPassword);
// Route to login a user
router.post('/login', AuthController.loginUser);
// Route to logout a user
router.post('/logout', AuthController.logoutUser);

export default router;