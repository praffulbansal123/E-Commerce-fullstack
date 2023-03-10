import { Request, Response, NextFunction, RequestHandler} from 'express';
import mongoose, { Types } from 'mongoose';
import IProduct, { IReview } from '../interface/models/product';
import logger from '../logger/logger';
import { IRequest } from '../middleware/auth';
import {createProductService, getAllProductService, getProductByIdService, deleteProductService, updatePoductService, createProductReviewService, getAllReviewByProductIdService, deleteReviewService} from '../services/productService'
import { IQueryStr } from '../utils/apiFeatures';


export const createProductHandler:RequestHandler = async (req: IRequest, res:Response, next:NextFunction) => {
    try {
        
        const requestBody = req.body

        const creatorId: Types.ObjectId = req.user ? req.user.id : undefined

        const product:IProduct = await createProductService(requestBody, creatorId)

        return res.status(201).send({status: true, message: 'Product created successfully', data: product})

    } catch (error:any) {
        logger.info(error.message);
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send({status: false, message : error.message});
         }
        next(error);
    }
}

export const getAllProductHandler:RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    try {

        const requestBody:IQueryStr = req.query

        const products:Array<IProduct> = await getAllProductService(requestBody)

        const productCount: number = products.length

        return res.status(200).send({status: true, message: 'Product Details Fetched', totalProducts: productCount, data: products})

    } catch (error:any) {
        logger.info(error.message);
        next(error);
    }
}

export const getProductByIdHandler:RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    try {

        const productId:string = req.params.productId

        const product:IProduct = await getProductByIdService(productId)

        return res.status(200).send({status: true, message: 'Product Details Fetched', data: product})

    } catch (error:any) {
        logger.info(error.message);
        next(error);
    }
}



export const updateProductHandler: RequestHandler = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const productId:string = req.params.productId
        const requestBody:any = req.body
        
        const updatedPoduct:IProduct = await updatePoductService(productId, requestBody)

        return res.status(200).send({status: true, message: 'Product Details updated successfully', data: updatedPoduct})

    } catch (error : any) {
        logger.info(error.message);
        next(error)
    }
}

export const deleteProductHandler: RequestHandler = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const productId:string = req.params.productId

        const isProductDeleted:boolean = await deleteProductService(productId)

        return res.status(200).send({status: isProductDeleted, message: 'Product deleted successfully'})

    } catch (error : any) {
        logger.info(error.message);
        next(error)
    }
}

// Create new Review or Update a Review
export const createProductReviewHandler: RequestHandler = async (req: IRequest, res: Response, next : NextFunction) => {
    try {
        const {rating, comment, productId} = req.body

        const reviewData: IReview = {
            user: req.user? req.user._id: undefined,
            name: req.user? req.user.name: undefined,
            userProfileImage: req.user? req.user.profileImage.url: undefined,
            rating,
            comment
        }

        const review = await createProductReviewService(productId, reviewData)

        res.status(200).send({status: true, message: 'Review added'})
        
    } catch (error: any) {
        logger.info(error.message);
        next(error)
    }
}

export const getAllReviewByProductIdHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.query.productId as string

        const reviews: IReview[] = await getAllReviewByProductIdService(productId)

        res.status(200).send({status: true, reviews})
        
    } catch (error: any) {
        logger.info(error.message);
        next(error)
    }
}

export const deleteReviewHandler: RequestHandler = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const productId = req.query.productId as string

        const reviewId = req.query.reviewId as string

        const userRole: string|undefined = req.user? req.user.role : undefined

        const userId: Types.ObjectId = req.user? req.user._id : undefined

        await deleteReviewService(productId, reviewId, userRole, userId)

        res.status(200).send({status: true, message: 'Review deleted'})
    } catch (error: any) {
        logger.info(error.message);
        next(error)
    }
}