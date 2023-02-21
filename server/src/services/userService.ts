import createError from 'http-errors';
import {IUserModel} from '../interface/models/user';
import User from '../models/userModel';

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