import express, {Router} from "express";
import * as UserController from '../controller/userController'

const router: Router = express.Router()

// Register a user route
router.post('/register', UserController.registerUserHandler)

// Login user route
router.post('/login', UserController.loginHandler)

// Log out user route
router.get('/logout', UserController.logoutHandler)

export default router