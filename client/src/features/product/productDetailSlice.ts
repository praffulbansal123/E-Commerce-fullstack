import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import axios from "axios";
import IProduct from "../../interface/productInterface";

// Actions
export const getProductDetails = createAsyncThunk('productDetails', async(productId:string|undefined, thunkApi) => {
    try {
        console.log(productId)
        const response = await axios.get<ProductResponse>(`http://localhost:8080/api/v1/product/${productId}`)
        return response.data
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
    }
})

// Slice
interface ProductState {
    isLoading: boolean,
    error: null | string,
    product: ProductResponse
}

interface ProductResponse {
    status: boolean,
    message: string,
    data: IProduct
}

const initialState: ProductState = {
    isLoading: true,
    error: null,
    product: {
        status: false,
        message: "",
        data: {
            name: "",
            description: "",
            price: 0,
            ratings: 0,
            productImage: [],
            createdBy: "",
            category: "",
            availableStock: 0,
            numOfReviews: 0,
            reviews: [],
            _id: "",
            createdAt: "",
            updatedAt: ""
        }
    }
}

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getProductDetails.pending, (state: ProductState) => {
                state.isLoading = true
            })
            .addCase(getProductDetails.fulfilled, (state: ProductState, action: PayloadAction<ProductResponse>) => {
                state.isLoading = false
                state.product = action.payload
            })
            .addCase(getProductDetails.rejected, (state: ProductState, action: PayloadAction<any>) => {
                state.isLoading = false
                state.error = action.payload
            });
    }
})

export default productDetailsSlice.reducer