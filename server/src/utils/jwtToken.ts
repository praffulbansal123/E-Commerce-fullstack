import { Response } from "express"
import { IUserModel } from "../interface/models/user"
import Locals from '../config/config'

const sendToken = (user: IUserModel, statusCode: number, res: Response) => {
    const token: string = user.getJWTToken()

    // Options for cookie
    console.log(Locals.config().cookieExpiry)
    const options = {
        expires: new Date(Date.now() + Locals.config().cookieExpiry),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).send({status: true, user, token})
}

export default sendToken