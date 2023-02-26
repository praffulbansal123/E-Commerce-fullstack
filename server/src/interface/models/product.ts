import { Document, Types } from 'mongoose'

interface productImage {
    public_id: string
    url: string
}

export interface IReview {
    user: Types.ObjectId,
    name: string | undefined,
    rating: number,
    comment: string,
}

export interface IDeleteReview extends IReview {
    _id?: string
}

export default interface IProduct extends Document{
    name: string,
    description: string,
    price: number,
    ratings: number,
    productImage: Array<productImage>,
    createdBy: Types.ObjectId
    category: string,
    availableStock: number,
    numOfReviews: number,
    reviews: Array<IDeleteReview>,
}