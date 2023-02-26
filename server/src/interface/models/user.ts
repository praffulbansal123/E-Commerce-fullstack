import { Document } from "mongoose"

interface image {
    public_id: string
    url: string
}

export interface INewUserDetails {
    name?: string,
    email?: string,
    phone?: string,
    role?: string
}

export interface IUser {
    name: string,
    email: string,
    profileImage: image,
    phone: string,
    password: string,
    role: string
    resetPasswordToken?: String,
    resetPasswordExpire?: Date
}

export interface IUserModel extends IUser, Document  {
    getJWTToken(): string,
    comparePassword(input: string): Promise<boolean>
    generateResetToken() : string
}