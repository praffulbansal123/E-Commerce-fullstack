import express, {Router} from "express";
import * as UserController from '../controller/userController'
import { isAuthenticated, isAuthorized } from '../middleware/auth';

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

// Get user Details
router.get('/me', isAuthenticated, UserController.getUserDetailsHandler)

// Update User Password Route
router.put('/password/update', isAuthenticated, UserController.updatePasswordHandler)

// Update User Profile Route
router.put('/me/update', isAuthenticated, UserController.updateProfileHandler)

// Get All User Route --Admin
router.get('/admin/users', isAuthenticated, isAuthorized('admin'), UserController.getAllUserHandler)

// Get User By Id Route --Admin
router.get('/admin/user/:userId', isAuthenticated, isAuthorized('admin'), UserController.getUserByIdHandler)

// Update User Role Route --Admin
router.put('/admin/user/:userId', isAuthenticated, isAuthorized('admin'), UserController.updateUserRoleHandler)

// Delete User Route --Admin
router.delete('/admin/user/:userId', isAuthenticated, isAuthorized('admin'), UserController.deleteUserHandler)

export default router