import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { GetCategoryProductsParam } from "features/shop/core/shop.params";
import { GetCategoryProductsRepository, GetCategoryProductsResponse } from "features/shop/data/repository/shop.repository";


export enum GetCategoryProductsState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetCategoryProductsState;
    data: Array<CategoryProductsModel> | undefined;
    message: ''
} = {
    status: GetCategoryProductsState.initial,
    data: undefined,
    message: ''
}

export const getCategoryProducts = createAsyncThunk('getCategoryProducts',
    async (param: GetCategoryProductsParam) => {
        const response : GetCategoryProductsResponse = await GetCategoryProductsRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const getCategoryProductsSlice = createSlice({
    name:'getCategoryProducts',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getCategoryProducts.pending, (state: any)=>{
            state.status = GetCategoryProductsState.inProgress;
        }).addCase(getCategoryProducts.fulfilled, (state: any, action : PayloadAction<{message: string, data: Array<CategoryProductsModel> | null}> ) => {
            const {data, message} = action.payload;
            state.status = GetCategoryProductsState.success;

            state.data = data;
            state.message = message;
        }).addCase(getCategoryProducts.rejected, (state: any, action: PayloadAction<{message : string}>) => {
            state.status = GetCategoryProductsState.fail;
            state.message = action.payload.message;
        })
    }
});



export const selectGetCategoryProducts = (state : RootState) => state.getCategoryProducts;

export default getCategoryProductsSlice.reducer;