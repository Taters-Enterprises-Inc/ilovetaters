import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { DealModel } from "features/popclub/core/domain/deal.model";
import { GetDealsParam } from "features/popclub/core/popclub.params";
import { GetDealRepository, GetDealResponse, GetDealsRepository, GetDealsRepositoryResponse } from "features/popclub/data/repository/popclub.repository";

export enum GetDealState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetDealState,
    data: DealModel | undefined
} = {
    status: GetDealState.initial,
    data: undefined,
}

export const getDeal = createAsyncThunk('getDeal',
    async (hash: string) => {
        const response : GetDealResponse = await GetDealRepository(hash);
        return response.data;
    }
)

/* Main Slice */
export const getDealSlice = createSlice({
    name:'getDeal',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getDeal.pending, (state: any)=>{
            state.status = GetDealState.inProgress;
        }).addCase(getDeal.fulfilled, (state: any, action : PayloadAction<{message: string, data: DealModel}> ) => {
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetDealState.success;
        })
    }
});



export const selectGetDeal = (state : RootState) => state.getDeal;

export default getDealSlice.reducer;