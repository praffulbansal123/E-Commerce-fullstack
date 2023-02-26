import { Request, Response, NextFunction, RequestHandler} from 'express';
import {INewUserDetails, IUserModel} from '../interface/models/user';
import logger from '../logger/logger';
import { IRequest } from '../middleware/auth';
import { registerUserService, loginService, forgetPasswordService, resetPasswordService, getUserDetailsService, updatePasswordService, updateProfileService, getAllUserService, getUserByIdService, deleteUserService } from '../services/userService';
import sendToken from '../utils/jwtToken';

declare module 'express-session' {
    export interface SessionData {
      user: { [key: string]: any };
    }
}

export const registerUserHandler: RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const requestBody: IUserModel = req.body;
    
        const user: IUserModel = await registerUserService(requestBody)

        req.session.user = user;

        sendToken(user, 201, res)
        
    } catch (error: any) {
        logger.info(error.message)
        next(error);
    }
}

export const loginHandler: RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body

        const user: IUserModel = await loginService(email, password)

        req.session.user = user;

        sendToken(user, 200, res)

    } catch (error: any) {
        logger.info(error.message)
        next(error);
    }
}

export const logoutHandler: RequestHandler =  async (req : any, res : Response, next : NextFunction) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    
    req.session.destroy((err : Error) => {
        if(err) {
            throw new Error(err.message);
        }
    });

   return res.clearCookie("connect.sid").status(200).send({status: true, message: "Logged out successfully"});
}

export const forgetPasswordHandler: RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const email: string = req.body.email

        const protocol: string = req.protocol

        const host = req.get('host') as string

        const user: IUserModel = await forgetPasswordService(email, protocol, host)

        res.status(200).send({status: true, message: `Email sent to ${user.email} successfully`})
        
    } catch (error: any) {
        logger.info(error.message)
        next(error);
    }
}

export const resetPasswordHandler: RequestHandler = async (req : Request, res : Response, next: NextFunction) => {
    try {
        const resetToken: string = req.params.token

        const password: string = req.body.password

        const confirmPassword: string = req.body.confirmPassword

        const user: IUserModel = await resetPasswordService(resetToken, password, confirmPassword)

        sendToken(user, 200, res)

    } catch (error: any) {
        logger.info(error.message)
        next(error);
    }
}

export const getUserDetailsHandler : RequestHandler = async (req : IRequest, res : Response, next : NextFunction) => {
    try {
        const userId: string = req.user? req.user.id : undefined

        const userDetails: IUserModel = await getUserDetailsService(userId)

        res.status(200).send({status: true, data: userDetails})

    } catch (error: any) {
        logger.info(error.message)
        next(error);
    }
}

export const updatePasswordHandler : RequestHandler = async (req : IRequest, res : Response, next : NextFunction) => {
    try {
        const userId: string = req.user? req.user.id : undefined

        const {oldPassword, newPassword, confirmPassword} = req.body

        const user: IUserModel = await updatePasswordService(userId, oldPassword, newPassword, confirmPassword)

        sendToken(user, 200, res)

    } catch (error: any) {
        logger.info(error.message)
        next(error);
    }
}

export const updateProfileHandler : RequestHandler = async (req : IRequest, res : Response, next : NextFunction) => {
    try {
        const userId: string = req.user? req.user.id : undefined

        const newUserData: INewUserDetails = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        }

        const user: IUserModel = await updateProfileService(userId, newUserData)

        res.status(200).send({status: true, messaage: 'User Profile Updated', data: user})
    } catch (error: any) {
        logger.info(error.message)
        next(error);
    }
}

// Get All User --Admin
export const getAllUserHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: Array<IUserModel> = await getAllUserService()

        res.status(200).send({status: true, count: users.length, users})
        
    } catch (error: any) {
        logger.info(error.message)
        next(error);
    }
}

// Get User by Id --Admin
export const getUserByIdHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId: string = req.params.userId

        const userDetails: IUserModel = await getUserByIdService(userId)

        res.status(200).send({status: true, userDetails})
        
    } catch (error: any) {
        logger.info(error.message)
        next(error);
    }
}

// Update User Role --Admin
export const updateUserRoleHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.userId

        const newUserData: INewUserDetails = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role
        }

        const user: IUserModel = await updateProfileService(userId, newUserData)

        res.status(200).send({status: true, messaage: 'User Role Updated', data: user})
    } catch (error: any) {
        logger.info(error.message)
        next(error);
    } 
}

// Delete User --Admin
export const deleteUserHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.userId

        const user = await deleteUserService(userId)

        res.status(200).send({status: true, messaage: 'User deleted successfully'})
    } catch (error: any) {
        logger.info(error.message)
        next(error);
    } 
}