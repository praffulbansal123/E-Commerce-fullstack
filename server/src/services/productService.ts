import Product from '../models/productModel';
import IProduct, { IDeleteReview, IReview } from "../interface/models/product"
import createError from 'http-errors';
import ApiFeatures, { IQueryStr } from '../utils/apiFeatures';
import { Types } from 'mongoose';


export const createProductService = async (input:any, creatorId: Types.ObjectId):Promise<IProduct> => {
    try {
        // Adding createdBy field to product
        input.createdBy = creatorId

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

export const getProductByIdService = async(productId:string):Promise<IProduct> => {
    try {
        const product:IProduct|null = await Product.findById(productId)

        if(!product)
            throw new createError.NotFound(`Product with ID: ${productId} does not exits`)

        return product
    } catch (error: any) {
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

export const createProductReviewService = async(productId: string, reviewData: IReview): Promise<void> => {
    try {
        const product: IProduct|null = await Product.findById(productId)

        if(!product)
            throw new createError.NotFound(`Product with Id: ${productId} does not exits.`)

        const isReviewed = product.reviews.find(rev => rev.user.toString() === reviewData.user.toString())

        if(isReviewed) {
            product.reviews.forEach(rev => {
                if(rev.user.toString() === reviewData.user.toString()){
                    rev.rating = reviewData.rating
                    rev.comment = reviewData.comment
                }
            })
        } else {
            product.reviews.push(reviewData)
            product.numOfReviews = product.reviews.length
        }

        const sum = product.reviews.reduce((acc, rev) => {
            acc+=rev.rating
            return acc
        }, 0 as number)

        product.ratings = sum / product.reviews.length

        await product.save({validateBeforeSave: false})

    } catch (error: any) {
        throw error
    }
}

export const getAllReviewByProductIdService = async (productId: string) : Promise<IReview[]> => {
    try {
        const product: IProduct|null = await Product.findById(productId)
        
        if(!product)
            throw new createError.NotFound(`Product with Id: ${productId} does not exits.`)

        const allReviews: IReview[] = product.reviews

        return allReviews

    } catch (error: any) {
        throw error
    }
}

export const deleteReviewService = async (productId: string, reviewId: string, userRole: string|undefined, userId: Types.ObjectId) : Promise<void> => {
    try {
        const product: IProduct|null = await Product.findById(productId)

        if(!product)
            throw new createError.NotFound(`Product with Id: ${productId} does not exits.`)

        let reviews: IDeleteReview[]
        if(userRole === 'admin'){
            reviews = product.reviews.filter(r => r._id!.toString() !== reviewId.toString())
        } else {
            const review = product.reviews.find(r => r._id!.toString() === reviewId.toString())
            if(review && review.user.toString() === userId.toString()){
                reviews = product.reviews.filter(r => r._id!.toString() !== reviewId.toString())
            } else {
                throw new createError.Unauthorized(`User is not authorized to delete this review`)
            }
        }
        
        const sum = reviews.reduce((acc, rev) => {
            acc+=rev.rating
            return acc
        }, 0 as number)
        
        const numOfReviews: number = reviews.length

        let ratings: number
        if(!sum){
            ratings = 0
        } else {
            ratings = sum / numOfReviews
        }
        

        await Product.findByIdAndUpdate(productId, {reviews, ratings, numOfReviews}, {new: true, runValidators: true, useFindAndModify: true})

    } catch (error: any) {
        throw error
    }
}