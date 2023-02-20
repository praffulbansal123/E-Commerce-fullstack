import { Document } from 'mongoose'

interface productImage {
    public_id: string
    url: string
}

interface reviews {
    name: string,
    rating: number,
    comment: string
}

export default interface IProduct extends Document{
    name: string,
    description: string,
    price: number,
    rating: number,
    productImage: Array<productImage>,
    category: string,
    availableStock: number,
    numOfReviews: number,
    reviews: Array<reviews>,
}