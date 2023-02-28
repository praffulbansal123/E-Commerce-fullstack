import express, {Express, Request, Response, NextFunction} from 'express'
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import createError from 'http-errors'
import morgan from 'morgan';
import MongoStore from 'connect-mongo';
import Database from './database/db';
import userRouter from './routes/userRoute';
import productRouter from './routes/productRoute';
import orderRouter from './routes/orderRoute';
import Locals from './config/config';
import multer from 'multer';
import logger from './logger/logger';
import cookieParser from 'cookie-parser'

// dotenv configuration
dotenv.config()

// express app configuration
const app:Express = express();

const port:number = Locals.config().port;

app.set('port', port);

// Implementing cors middleware
app.use(cors());

// Implementing helmet middleware
app.use(helmet());

// Implementing morgan middleware
app.use(morgan('dev'));

// Implementing express session middleware
app.use(session({
    secret: Locals.config().secret,
    resave: false as boolean,
    saveUninitialized: true as boolean,
    cookie: {
        maxAge: 2 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
        mongoUrl: Locals.config().mongooseUrl,
        ttl: Locals.config().ttl,
    })
}));

// Parsing middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());

// Database initialized
Database.init();

// diverting user request to user router
app.use("/api/v1", userRouter);

// diverting product request to product router
app.use("/api/v1", productRouter);

// diverting product request to order router
app.use("/api/v1", orderRouter);

// checking invalid route
app.use((req:Request, res:Response, next:NextFunction) => {
    next( new createError.BadRequest("This route does not exits"))
}) 

// Intializing error-handling
app.use((err:any, req:Request, res:Response, next:NextFunction) => {

    // Wrong Mongo ID Error
    if(err.name === "CastError") {
        err.status = 400;
        err.message =`Resource not found. Inavlid: ${err.path}`
    }

    // Validation Error
    if(err.name === "ValidationError") {
        err.status = 400;
    }

    res.status(err.status || 500);
    res.send({statusCode: err.status || 500, status: false, message: err.message});
});

// Unhandled Promise Rejections
process.on('unhandledRejection', (err: any) => {
    logger.info(`Error: ${err.message}`)
    logger.info('Server is shutting down due to unhandled promise rejections')

    process.exit(1)
})

export default app;