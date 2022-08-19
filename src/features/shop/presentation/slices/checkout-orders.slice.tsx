import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { ProductModel } from "features/shared/core/domain/product.model";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { CheckoutOrdersModel } from "features/shop/core/domain/checkout-orders.model";
import { AddToCartParam, CheckoutOrdersParam, GetCategoryProductsParam, GetProductDetailsParam } from "features/shop/core/shop.params";
import GetCategoryProductsUsecase from "features/shop/core/usecase/get-category-products.usecase";
import { AddToCartRepository, AddToCartResponse, CheckoutOrdersRepository, CheckoutOrdersResponse, GetCategoryProductsResponse, GetProductDetailsRepository, GetProductDetailsResponse } from "features/shop/data/repository/shop.repository";


export enum CheckoutOrdersState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: CheckoutOrdersState,
    data: CheckoutOrdersModel | undefined,
} = {
    status: CheckoutOrdersState.initial,
    data: undefined,
}

export const checkoutOrders = createAsyncThunk('checkoutOrders',
    async (param: CheckoutOrdersParam) => {
        const response : CheckoutOrdersResponse = await CheckoutOrdersRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const checkoutOrdersSlice = createSlice({
    name:'checkoutOrders',
    initialState,
    reducers : {
        resetCheckoutOrders : (state)=>{
            state.status = CheckoutOrdersState.initial;
            state.data = undefined;
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(checkoutOrders.pending, (state: any)=>{
            state.status = CheckoutOrdersState.inProgress;
        }).addCase(checkoutOrders.fulfilled, (state: any, action : PayloadAction<{ message: string; data: CheckoutOrdersModel | undefined }> ) => {
            const data = action.payload.data;
            
            state.data = data;
            state.status = CheckoutOrdersState.success;
        })
    }
});



export const selectCheckoutOrders = (state : RootState) => state.checkoutOrders;

export const { resetCheckoutOrders } = checkoutOrdersSlice.actions;

export default checkoutOrdersSlice.reducer;