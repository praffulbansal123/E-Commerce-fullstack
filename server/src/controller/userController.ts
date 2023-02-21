import { Request, Response, NextFunction, RequestHandler} from 'express';
import {IUserModel} from '../interface/models/user';
import logger from '../logger/logger';
import { registerUserService, loginService } from '../services/userService';
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

export const logoutHandler =  async (req : any, res : Response, next : NextFunction) => {
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