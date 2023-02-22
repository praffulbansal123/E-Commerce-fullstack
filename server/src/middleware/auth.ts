import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import Locals from "../config/config";
import { IUserModel } from "../interface/models/user";
import logger from "../logger/logger";
import User from "../models/userModel";

export interface IRequest extends Request {
    user?: IUserModel
}

export const isAuthenticated = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['token']

        console.log(token)

        if(!token)
            throw new createError.Unauthorized("Token is required...please login first.");

        const decodedToken = jwt.verify(token, Locals.config().jwtSecret) as JwtPayload;

        req.user = await User.findById(decodedToken.id) as IUserModel;

        next()
    } catch (error: any) {
        logger.info(error.message);
        error.status = 401
        next(error)
    }
}

export const isAuthorized = (...roles:Array<string>) => {
    return (req: any, res: Response, next: NextFunction) => {
        if(!roles.includes(req.user.role))
            throw new createError.Forbidden(`Role: ${req.user.role} is not authorized to access this resource`)
        
        next()
    }
}