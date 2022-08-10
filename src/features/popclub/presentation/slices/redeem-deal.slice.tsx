import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RedeemDealModel } from "features/shared/core/domain/redeem_deal.model";
import {RedeemDealParam } from "features/popclub/core/popclub.params";
import {RedeemDealRepository, RedeemDealResponse } from "features/popclub/data/repository/popclub.repository";

export enum RedeemDealState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: RedeemDealState,
    data: RedeemDealModel | undefined | null,
} = {
    status: RedeemDealState.initial,
    data: undefined,
}

export const redeemDeal = createAsyncThunk('redeemDeal',
    async (param: RedeemDealParam) => {
        const response : RedeemDealResponse = await RedeemDealRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const redeemDealSlice = createSlice({
    name:'redeemDeal',
    initialState,
    reducers : {
        resetRedeemDeal: (state) => {
            state.status = RedeemDealState.initial;
        },
    },
    extraReducers: (builder: any) => {
        builder.addCase(redeemDeal.pending, (state: any)=>{
            state.status = RedeemDealState.inProgress;
        }).addCase(redeemDeal.fulfilled, (state: any, action : PayloadAction<{message: string, data: RedeemDealModel}> ) => {
            const data = action.payload.data;

            console.log(action.payload.message);
            
            
            state.data = data;
            state.status = RedeemDealState.success;
        })
    }
});



export const selectRedeemDeal = (state : RootState) => state.redeemDeal;

export const { resetRedeemDeal } = redeemDealSlice.actions;

export default redeemDealSlice.reducer;