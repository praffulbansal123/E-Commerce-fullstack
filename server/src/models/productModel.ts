import {Schema, model, Types} from "mongoose";
import IProduct from "../interface/models/product"
import mongooseUniqueValidator from "mongoose-unique-validator";

export const productImageSchema: Schema = new Schema({
    public_id: {type: String, required: true},
    url: {type: String, required: true}
}, {_id: false})

export const productSchema:Schema = new Schema({
    name: {type: String, required: [true, 'Please enter Product Name'], unique: true, trim: true},
    description: {type: String, required: [true, 'Please enter Product Description']},
    price: {type: Number, required: [true, 'Please enter Product Description'], maxLength: [8, 'Price can not exceed 8 characters']},
    ratings: {type: Number, default: 0},
    productImage: [productImageSchema],
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {type: String, required: [true, 'Please enter Product Category']},
    availableStock: {type: Number, required: [true, 'Please enter Product stock'], maxLength: [4, 'Stock can not exceed 4 characters'], default: 1},
    numOfReviews: {type: Number, default: 0},
    reviews: [{
        user: { type: Types.ObjectId, ref: "User", required: true},
        name: {type: String, required: true},
        rating: {type: Number, required: true},
        comment: {type: String, required: true}
    }],
}, {timestamps: true})

// unique fields validation
productSchema.plugin(mongooseUniqueValidator, {message: 'already taken'});

// Creating Product Model
const Product = model<IProduct>('Product', productSchema);

export default Product;