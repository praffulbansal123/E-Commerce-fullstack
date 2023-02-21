import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import Locals from "../config/config";
import logger from "../logger/logger";

export const isAuthenticatedUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        const {token} = req.cookies

        if(!token)
            throw new createError.Unauthorized("Token is required...please login first.");

        const decodedToken = jwt.verify(token, Locals.config().jwtSecret) as JwtPayload;

        req.userId = decodedToken.id;

        next()
    } catch (error: any) {
        logger.info(error.message);
        error.status = 401
        next(error)
    }
}