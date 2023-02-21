import Product from '../models/productModel';
import IProduct from "../interface/models/product"
import createError from 'http-errors';
import ApiFeatures, { IQueryStr } from '../utils/apiFeatures';


export const createProductService = async (input:any):Promise<IProduct> => {
    try {

        // Creating product
        const product:IProduct = await Product.create(input)

        return product
    } catch (error:any) {
        throw error
    }
}

export const getAllProductService = async (input:IQueryStr):Promise<Array<IProduct>> => {
    try {

        const productsPerPage: number = 5

        const apiFeatures = new ApiFeatures(Product.find(), input).serach().filter().pagination(productsPerPage)

        const products:Array<IProduct> = await apiFeatures.query
        
        return products
        
    } catch (error:any) {
        throw error
    }
}

export const updatePoductService = async (productId:string, requestBody:any): Promise<IProduct> => {
    try {

        const product:IProduct|null = await Product.findOne({_id: productId})
        
        if(!product)
            throw new createError.BadRequest(`No product exits with ID: ${productId}`)
        
        const updatedProduct = await Product.findByIdAndUpdate({ _id: productId}, { $set: requestBody }, { new: true, runValidators: true, useFindAndModify: false }) as IProduct

        return updatedProduct

    } catch (error : any) {
        throw error
    }
}

export const deleteProductService = async (input: string): Promise<boolean> => {
    try {
        
        const product:IProduct|null = await Product.findOne({ _id: input})

        if(!product)
            throw new createError.NotFound(`No product exits with ID: ${input} or it has been deleted`)

        const deletedProduct = await Product.deleteOne({ _id: input })

        return deletedProduct.acknowledged


    } catch (error : any) {
        throw error
    }
}