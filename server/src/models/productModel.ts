import {Schema, model} from "mongoose";
import IProduct from "../interface/models/product"
import mongooseUniqueValidator from "mongoose-unique-validator";

export const productSchema:Schema = new Schema({
    name: {type: String, required: [true, 'Please enter Product Name'], unique: true, trim: true},
    description: {type: String, required: [true, 'Please enter Product Description']},
    price: {type: Number, required: [true, 'Please enter Product Description'], maxLength: [8, 'Price can not exceed 8 characters']},
    ratings: {type: String, default: 0},
    productImage: [{
        public_id: {type: String, required: true},
        url: {type: String, required: true},
    }],
    category: {type: String, required: [true, 'Please enter Product Category']},
    availableStock: {type: Number, required: [true, 'Please enter Product stock'], maxLength: [4, 'Stock can not exceed 4 characters'], default: 1},
    numOfReviews: {type: Number, default: 0},
    reviews: [{
        name: {type: String, required: true},
        rating: {type: String, required: true},
        comment: {type: String, required: true}
    }],
}, {timestamps: true})

// unique fields validation
productSchema.plugin(mongooseUniqueValidator, {message: 'already taken'});

// productSchema.pre('findOneAndUpdate', (next) => {
//     const product = this
//     product.options.runValidators = true
//     next()
// })

// Creating Product Model
const Product = model<IProduct>('Product', productSchema);

export default Product;