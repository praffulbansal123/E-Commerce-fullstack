import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import axios from "axios";
import IProduct from "../../interface/productInterface";

type Data = {
    keyword?: string|undefined,
    currentPage?: number,
    price?: number[],
    category?: string,
    ratings?: number
}

// Actions
export const getProducts = createAsyncThunk('products', async({keyword = "", currentPage = 1, price = [0, 100000], category, ratings = 0}:Data, thunkApi) => {
    try { 
        let url = `http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            url += `&category=${category}`
        }
        const response = await axios.get<ProductResponse>(url)
        return response.data
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

// Slice
interface ProductState {
    isLoading: boolean,
    progress: number
    error: null | string,
    products: ProductResponse
}

interface ProductResponse {
    status: boolean,
    message: string,
    totalProducts: number,
    productsPerPage: number,
    filteredProductsCount: number,
    data: IProduct[]
}

const initialState: ProductState = {
    isLoading: false,
    progress: 0,
    error: null,
    products: {
        status: false,
        message: "",
        totalProducts: 0,
        productsPerPage: 0,
        filteredProductsCount: 0,
        data: []
    },
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getProducts.pending, (state: ProductState) => {
                state.isLoading = true
                state.progress = 90
            })
            .addCase(getProducts.fulfilled, (state: ProductState, action: PayloadAction<ProductResponse>) => {
                state.isLoading = false
                state.progress = 100
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state: ProductState, action: PayloadAction<any>) => {
                state.isLoading = false
                state.error = action.payload
                state.progress = 100
            })
    }
})

export default productSlice.reducer