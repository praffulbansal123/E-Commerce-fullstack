import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import axios from "axios";
import IProduct from "../../interface/productInterface";

// Actions
export const getProducts = createAsyncThunk('products', async(data, thunkApi) => {
    try {
        const response = await axios.get<ProductResponse>('http://localhost:8080/api/v1/products')
        return response.data
    } catch (error: any) {
        console.log(error)
        return thunkApi.rejectWithValue(error.message)
    }
})

// Slice
interface ProductState {
    isLoading: boolean,
    error: null | string,
    products: ProductResponse
}

interface ProductResponse {
    status: boolean,
    message: string,
    data: IProduct[]
}

const initialState: ProductState = {
    isLoading: false,
    error: null,
    products: {
        status: false,
        message: "",
        data: []
    }
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getProducts.pending, (state: ProductState) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state: ProductState, action: PayloadAction<ProductResponse>) => {
                state.isLoading = false
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state: ProductState, action: PayloadAction<any>) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export default productSlice.reducer