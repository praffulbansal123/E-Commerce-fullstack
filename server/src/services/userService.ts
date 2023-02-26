import createError from 'http-errors';
import {INewUserDetails, IUserModel} from '../interface/models/user';
import User from '../models/userModel';
import sendEmail from '../utils/sendEmail';
import crypto from 'crypto'
import { AnyNaptrRecord } from 'dns';

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
        const resetPasswordUrl:string = `${protocol}://${host}/api/v1/password/reset/${resetToken}`

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
    } catch (error: any) {
        throw error
    }
}

export const getUserDetailsService = async (input: string): Promise<IUserModel> => {
    try {
        if(!input)
            throw new createError.BadRequest('Please Login first')
        
        const user = await User.findById(input) as IUserModel

        return user
    } catch (error: any) {
        throw error
    }
}

export const updatePasswordService = async (userId: string, oldPassword: string, newPassword: string, confirmPassword: string): Promise<IUserModel> => {
    try {
        if(!userId)
            throw new createError.BadRequest('Please Login first')
        
        const user = await User.findById(userId).select('+password') as IUserModel

        const isPasswordMatched = await user.comparePassword(oldPassword)

        if(!isPasswordMatched)
            throw new createError.BadRequest('Incorrect Old Password')

        if(newPassword !== confirmPassword)
            throw new createError.BadRequest('Password does not match')

        user.password = newPassword

        await user.save()

        return user
    } catch (error: any) {
        throw error
    }
}

export const updateProfileService = async (userId: string, newUserData: INewUserDetails): Promise<IUserModel> => {
    try {
        
        const user = await User.findByIdAndUpdate(userId, newUserData, {new: true, runValidators: true, useFindAndModify: false}) as IUserModel

        if(!user)
            throw new createError.NotFound(`User with Id: ${userId} does not exits`)

        return user
    } catch (error: any) {
        throw error
    }
}

export const getAllUserService = async (): Promise<IUserModel[]> => {
    try {
        const users: IUserModel[] = await User.find()

        if(users.length === 0)
            throw new createError.NotFound('No user exits')
        
        return users
    } catch (error: any) {
        throw error
    }
}

export const getUserByIdService = async (userId: string): Promise<IUserModel> => {
    try {
        const user = await User.findById(userId) as IUserModel

        if(!user)
            throw new createError.NotFound(`User does not exits with Id: ${userId}`)
        
        return user
        
    } catch (error: any) {
        throw error
    }
}

export const deleteUserService = async (userId: string): Promise<void> => {
    try {
        const user = await User.findById(userId) as IUserModel

        if(!user)
            throw new createError.NotFound(`User does not exits with Id: ${userId}`)
        
        await user.remove()
        
    } catch (error: any) {
        throw error
    }
}