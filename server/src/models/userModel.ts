import {Model, Schema, model} from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import validator from "validator"
import {IUserModel} from "../interface/models/user";
import bcrypt from 'bcrypt';
import Locals from "../config/config";
import jwt, { JwtPayload } from 'jsonwebtoken'

export const userSchema:Schema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter your Name"],
        maxLength: [30, "Name cannot be longer than 30 characters"],
        minLength: [4, "Name cannot be shorter than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email address"]
    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
        validate: [validator.isStrongPassword, "Password should contain at least 1 Uppercase letter, 1 Lowercase letter, 1 Number, 1 Symbol and should be at least 8 characters long"],
        select: false
    },
    phone: {
        type: String,
        required: [true, "Please Enter your Mobile Phone Number"],
        validate: [validator.isMobilePhone, "Please enter a valid Mobile Phone"],
        match: [/^[0-9]{10}$/, "Please enter a valid Mobile Phone"],
        unique: true
    },
    profileImage: {
        public_id: {type: String, required: [true, "Please Enter your Profile Image"]},
        url: {type: String, required: [true, "Please Enter your Profile Image"]},
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {timestamps: true});

// unique fields validation
userSchema.plugin(mongooseUniqueValidator, {message: `This User is already registered`});

// password hashing function
userSchema.pre<IUserModel>('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }
    try {     
        const salt = bcrypt.genSaltSync(Locals.config().saltRound);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error : any) {
        return next(error);
    }
});

// JWT Token
userSchema.methods.getJWTToken = function () {
    const user = this as IUserModel;
    const payload: JwtPayload = {
        id: user._id.toString() as string
    }
    return jwt.sign(payload, Locals.config().jwtSecret, {
        expiresIn: Locals.config().jwtExpiration
    })
}

// Compare Password
userSchema.methods.comparePassword = async function (requestedPassword: string): Promise<boolean> {
    const user = this as IUserModel;
    return await bcrypt.compare(requestedPassword, user.password)
}

// Creating User Model
const User = model<IUserModel>('User', userSchema);

export default User;