import express, {Router} from "express";
import * as UserController from '../controller/userController'

const router: Router = express.Router()

// Register a user route
router.post('/register', UserController.registerUserHandler)

// Login user route
router.post('/login', UserController.loginHandler)

// Forgot password route
router.post('/password/forgot', UserController.forgetPasswordHandler)

// Reset password route
router.put('/password/reset/:token', UserController.resetPasswordHandler)

// Log out user route
router.get('/logout', UserController.logoutHandler)

export default router