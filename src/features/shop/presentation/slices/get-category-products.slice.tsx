import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SessionModel } from "features/shared/core/domain/session.model";
import { GetSessionRepository, GetSessionResponse} from "features/shared/data/repository/shared.repository";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { GetCategoryProductsParam } from "features/shop/core/shop.params";
import GetCategoryProductsUsecase from "features/shop/core/usecase/get-category-products.usecase";
import { GetCategoryProductsResponse } from "features/shop/data/repository/shop.repository";


export enum GetCategoryProductsState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetCategoryProductsState,
    data: Array<CategoryProductsModel> | undefined
} = {
    status: GetCategoryProductsState.initial,
    data: undefined,
}

export const getCategoryProducts = createAsyncThunk('getCategoryProducts',
    async (param: GetCategoryProductsParam) => {
        const response : GetCategoryProductsResponse = await GetCategoryProductsUsecase(param);
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
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetCategoryProductsState.success;
        })
    }
});



export const selectGetCategoryProducts = (state : RootState) => state.getCategoryProducts;

export default getCategoryProductsSlice.reducer;