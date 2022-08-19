import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { ProductModel } from "features/shared/core/domain/product.model";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { OrderModel } from "features/shop/core/domain/order.model";
import { AddToCartParam, GetCategoryProductsParam, GetOrdersParam, GetProductDetailsParam } from "features/shop/core/shop.params";
import GetCategoryProductsUsecase from "features/shop/core/usecase/get-category-products.usecase";
import { AddToCartRepository, AddToCartResponse, GetCategoryProductsResponse, GetOrdersRepository, GetOrdersResponse, GetProductDetailsRepository, GetProductDetailsResponse } from "features/shop/data/repository/shop.repository";


export enum GetOrdersState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetOrdersState,
    data: OrderModel | undefined
} = {
    status: GetOrdersState.initial,
    data: undefined
}

export const getOrders = createAsyncThunk('getOrders',
    async (param: GetOrdersParam) => {
        const response : GetOrdersResponse = await GetOrdersRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const getOrdersSlice = createSlice({
    name:'getOrders',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getOrders.pending, (state: any)=>{
            state.status = GetOrdersState.inProgress;
        }).addCase(getOrders.fulfilled, (state: any, action : PayloadAction<{message: string, data: OrderModel | null}> ) => {
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetOrdersState.success;
        })
    }
});



export const selectGetOrders = (state : RootState) => state.getOrders;

export default getOrdersSlice.reducer;