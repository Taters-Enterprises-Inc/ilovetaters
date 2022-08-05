import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { DealModel } from "features/popclub/core/domain/deal.model";
import { GetDealsParam } from "features/popclub/core/popclub.params";
import { GetDealsRepository, GetDealsRepositoryResponse } from "features/popclub/data/repository/popclub.repository";

export enum GetDealsState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetDealsState,
    data: Array<DealModel>
} = {
    status: GetDealsState.initial,
    data: [],
}

export const getDeals = createAsyncThunk('getDeals',
    async (param: GetDealsParam) => {
        const response : GetDealsRepositoryResponse = await GetDealsRepository(param);
        
        return response.data;
    }
)

/* Main Slice */
export const getDealsSlice = createSlice({
    name:'getDeals',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getDeals.pending, (state: any)=>{
            state.status = GetDealsState.inProgress;
        }).addCase(getDeals.fulfilled, (state: any, action : PayloadAction<{message: string, data: Array<DealModel>}> ) => {
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetDealsState.success;
        })
    }
});



export const selectGetDeals = (state : RootState) => state.getDeals;

export default getDealsSlice.reducer;