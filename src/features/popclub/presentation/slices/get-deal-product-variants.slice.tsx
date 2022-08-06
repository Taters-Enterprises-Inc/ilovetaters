import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { DealProductVariantsModel } from "features/popclub/core/domain/deal_product_variants.model";
import { PlatformModel } from "features/popclub/core/domain/platform.model";
import { ProductVariantModel } from "features/popclub/core/domain/product_variant.model";
import { GetDealProductVariantsParam } from "features/popclub/core/popclub.params";
import { GetAllPlatformRepository, GetAllPlatformRepositoryResponse, GetDealProductVariantsRepository, GetDealProductVariantsResponse } from "features/popclub/data/repository/popclub.repository";

export enum GetDealProductVariantsState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetDealProductVariantsState,
    data: Array<DealProductVariantsModel>,
} = {
    status: GetDealProductVariantsState.initial,
    data: [],
}

export const getDealProductVariants = createAsyncThunk('getDealProductVariants',
    async (param: GetDealProductVariantsParam) => {
        const response : GetDealProductVariantsResponse = await GetDealProductVariantsRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const getDealProductVariantsSlice = createSlice({
    name:'getDealProductVariants',
    initialState,
    reducers : {
        resetGetDealProductVariantsState: (state) => {
            state.status = GetDealProductVariantsState.initial;
        },
    },
    extraReducers: (builder: any) => {
        builder.addCase(getDealProductVariants.pending, (state: any)=>{
            state.status = GetDealProductVariantsState.inProgress;
        }).addCase(getDealProductVariants.fulfilled, (state: any, action : PayloadAction<{message: string, data: Array<DealProductVariantsModel>}> ) => {
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetDealProductVariantsState.success;
        });
        
    }
});



export const selectGetDealProductVariants = (state : RootState) => state.getDealProductVariants;

export const { resetGetDealProductVariantsState } = getDealProductVariantsSlice.actions;

export default getDealProductVariantsSlice.reducer;