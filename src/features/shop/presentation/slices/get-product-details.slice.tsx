import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { ProductModel } from "features/shared/core/domain/product.model";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { GetCategoryProductsParam, GetProductDetailsParam } from "features/shop/core/shop.params";
import GetCategoryProductsUsecase from "features/shop/core/usecase/get-category-products.usecase";
import { GetCategoryProductsResponse, GetProductDetailsRepository, GetProductDetailsResponse } from "features/shop/data/repository/shop.repository";


export enum GetProductDetailsState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetProductDetailsState,
    data: {
        product: ProductModel;
        addons: Array<ProductModel>;
        product_size: Array<{
            id: number;
            name: string;
        }>;
        product_flavor: Array<{
            id: number;
            name: string;
        }>;
        suggested_products: Array<ProductModel>;
    } | undefined
} = {
    status: GetProductDetailsState.initial,
    data: undefined,
}

export const getProductDetails = createAsyncThunk('getProductDetails',
    async (param: GetProductDetailsParam) => {
        const response : GetProductDetailsResponse = await GetProductDetailsRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const getProductDetailsSlice = createSlice({
    name:'getProductDetails',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getProductDetails.pending, (state: any)=>{
            state.status = GetProductDetailsState.inProgress;
        }).addCase(getProductDetails.fulfilled, (state: any, action : PayloadAction<{message: string, data: { 
                product : ProductModel; 
                addons: Array<ProductModel>; 
                product_flavor: Array<any>; 
                suggested_products: Array<ProductModel>;
            } | null}> ) => {
                
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetProductDetailsState.success;
        })
    }
});



export const selectGetProductDetails = (state : RootState) => state.getProductDetails;

export default getProductDetailsSlice.reducer;