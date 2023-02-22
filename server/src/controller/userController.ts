import { Request, Response, NextFunction, RequestHandler} from 'express';
import {IUserModel} from '../interface/models/user';
import logger from '../logger/logger';
import { registerUserService, loginService, forgetPasswordService, resetPasswordService } from '../services/userService';
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