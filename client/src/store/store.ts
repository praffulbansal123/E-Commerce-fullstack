import {combineReducers, configureStore} from '@reduxjs/toolkit';
import notificationSlice from '../features/notification/notification';
import productDetailSlice from '../features/product/productDetailSlice';
import productSlice from '../features/product/productSlice';

const reducer = combineReducers({
    products: productSlice,
    productDetails: productDetailSlice,
    notifications: notificationSlice
})

const store = configureStore({
    reducer
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store