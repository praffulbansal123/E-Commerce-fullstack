interface productImage {
    public_id: string
    url: string
}

export interface IReview {
    user: string| undefined,
    name: string | undefined,
    userProfileImage?: string | undefined,
    rating: number | undefined,
    comment: string | undefined,
    _id: string | undefined
}

export default interface IProduct {
    name: string,
    description: string,
    price: number,
    ratings: number,
    productImage: Array<productImage>,
    createdBy: string
    category: string,
    availableStock: number,
    numOfReviews: number,
    reviews: Array<IReview>,
    _id?: string,
    createdAt?: string,
    updatedAt?: string
}