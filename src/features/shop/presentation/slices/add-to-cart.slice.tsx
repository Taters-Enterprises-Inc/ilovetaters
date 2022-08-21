import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { ProductModel } from "features/shared/core/domain/product.model";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { AddToCartParam, GetCategoryProductsParam, GetProductDetailsParam } from "features/shop/core/shop.params";
import { AddToCartRepository, AddToCartResponse, GetCategoryProductsResponse, GetProductDetailsRepository, GetProductDetailsResponse } from "features/shop/data/repository/shop.repository";


export enum AddToCartState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: AddToCartState,
    message: string | undefined
} = {
    status: AddToCartState.initial,
    message: undefined
}

export const addToCart = createAsyncThunk('addToCart',
    async (param: AddToCartParam) => {
        const response : AddToCartResponse = await AddToCartRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const addToCartSlice = createSlice({
    name:'addToCart',
    initialState,
    reducers : {
        resetAddToCart : (state)=>{
            state.status = AddToCartState.initial;
            state.message = undefined;
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(addToCart.pending, (state: any)=>{
            state.status = AddToCartState.inProgress;
        }).addCase(addToCart.fulfilled, (state: any, action : PayloadAction<{message: string, data: { 
                product : ProductModel; 
                addons: Array<ProductModel>; 
                product_flavor: Array<any>; 
            } | null}> ) => {
                
            const data = action.payload.data;
            
            state.data = data;
            state.status = AddToCartState.success;
        })
    }
});



export const selectAddToCart = (state : RootState) => state.addToCart;


export const {resetAddToCart} = addToCartSlice.actions;

export default addToCartSlice.reducer;