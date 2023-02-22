import createError from 'http-errors';
import {IUserModel} from '../interface/models/user';
import User from '../models/userModel';
import sendEmail from '../utils/sendEmail';
import crypto from 'crypto'

export const registerUserService = async(input: IUserModel): Promise<IUserModel> => {
    try {
        // Creating a new User
        const user: IUserModel = await User.create(input);

        return user;
    } catch (error: any) {
        throw error;
    }
}

export const loginService = async(email: string, password: string): Promise<IUserModel> => {
    try {
        if(!email || !password) 
            throw new createError.BadRequest("Please enter a valid email and password")

        const user: IUserModel|null = await User.findOne({email}).select('+password')

        if(!user)
            throw new createError.NotFound('Invalid email or password')

        const isPasswordMatched = await user.comparePassword(password)

        if(!isPasswordMatched)
            throw new createError.Unauthorized('Invalid email or password')

        return user
    } catch (error: any) {
        throw error
    }
}

export const forgetPasswordService = async(email: string, protocol: string, host: string): Promise<IUserModel> => {
    try {
        const user: IUserModel|null = await User.findOne({email})

        if(!user)
            throw new createError.NotFound('User not found')

        // Get Reset Password Token
        const resetToken: string = user.generateResetToken()

        // Saving hashed reset password token and expiry to user
        await user.save({validateBeforeSave: false})

        // Generating reset password url
        const resetPasswordUrl:string = `${protocol}://${host}/api/user/password/reset/${resetToken}`

        // Reset Password message
        const message: string = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email; Please ignore this email.`

        try {
            await sendEmail({
                email: user.email,
                subject: 'Ecomerce Reset Password',
                message: message,
            })
            
            return user
            
        } catch (error) {
            // Setting both to undefined
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            
            // saving user to database after removing reset password token and expiry
            await user.save({validateBeforeSave: false})

            throw error
        }
        
    } catch (error: any) {
        throw error
    }
}

export const resetPasswordService = async (input: string, password: string, confirmPassword: string): Promise<IUserModel> => {
    try {
        // Creating token hash as it is saved as hashed token in database
        const resetPasswordToken: string = crypto.createHash('sha256').update(input).digest('hex')

        // Getting user from database with the hashed token
        const user: IUserModel|null = await User.findOne({resetPasswordToken, resetPasswordExpire: {$gt: Date.now()}})

        if(!user)
            throw new createError.NotFound('Reset Password Token is invalid or it has expired')

        if(password !== confirmPassword)
            throw new createError.BadRequest('Password and confirmPassword does not match')
        
        user.password = password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        return user
    } catch (error) {
        throw error
    }
}