import express from "express"
import { loginUser, registerUser, getUserProfile, logoutUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
//localhost:4000/api/v1/users/register
router.post('/register', registerUser)
//localhost:4000/api/v1/users/auth
router.post('/login', loginUser);
//localhost:4000/api/v1/users/profile
router.get('/profile', protect , getUserProfile)
//localhost:4000/api/v1/usres/logout
router.post('/logout', logoutUser);






export default router