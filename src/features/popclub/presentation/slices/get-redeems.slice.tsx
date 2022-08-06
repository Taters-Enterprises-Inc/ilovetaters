import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RedeemDealModel } from "features/popclub/core/domain/redeem_deal.model";
import {RedeemDealParam } from "features/popclub/core/popclub.params";
import {GetRedeemsRepository, GetRedeemsResponse, RedeemDealRepository, RedeemDealResponse } from "features/popclub/data/repository/popclub.repository";

export enum GetRedeemsState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetRedeemsState,
    data: Array<RedeemDealModel>
} = {
    status: GetRedeemsState.initial,
    data: [],
}

export const getRedeems = createAsyncThunk('getRedeems',
    async () => {
        const response : GetRedeemsResponse = await GetRedeemsRepository();
        return response.data;
    }
)

/* Main Slice */
export const getRedeemsSlice = createSlice({
    name:'getRedeems',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getRedeems.pending, (state: any)=>{
            state.status = GetRedeemsState.inProgress;
        }).addCase(getRedeems.fulfilled, (state: any, action : PayloadAction<{message: string, data: RedeemDealModel}> ) => {
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetRedeemsState.success;
        })
    }
});



export const selectGetRedeems = (state : RootState) => state.getRedeems;

export default getRedeemsSlice.reducer;