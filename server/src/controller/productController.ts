import { Request, Response, NextFunction, RequestHandler} from 'express';
import mongoose from 'mongoose';
import IProduct from '../interface/models/product';
import logger from '../logger/logger';
import {createProductService, getAllProductService, deleteProductService, updatePoductService} from '../services/productService'
import { IQueryStr } from '../utils/apiFeatures';


export const createProductHandler:RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    try {
        
        const requestBody = req.body

        const product:IProduct = await createProductService(requestBody)

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