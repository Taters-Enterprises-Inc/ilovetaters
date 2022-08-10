

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RedeemDealModel } from "features/shared/core/domain/redeem_deal.model";
import { GetRedeemParam} from "features/popclub/core/popclub.params";
import { GetLatestUnexpiredRedeemRepository, GetLatestUnexpiredRedeemResponse, GetRedeemRepository, GetRedeemResponse } from "features/popclub/data/repository/popclub.repository";

export enum GetLatestUnexpiredRedeemState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetLatestUnexpiredRedeemState,
    message: string,
    next_avialable_redeem?: string,
    redeem_cooldown?: string,
    data: RedeemDealModel | undefined | null,
} = {
    status: GetLatestUnexpiredRedeemState.initial,
    message: '',
    data: undefined,
}

export const getLatestUnexpiredRedeem = createAsyncThunk('getLatestUnexpiredRedeem',
    async () => {
        const response : GetLatestUnexpiredRedeemResponse = await GetLatestUnexpiredRedeemRepository();
        
        return response.data;
    }
)

/* Main Slice */
export const getLatestUnexpiredRedeemSlice = createSlice({
    name:'getLatestUnexpiredRedeem',
    initialState,
    reducers : { 
        resetGetLatestUnexpiredRedeem : (state) =>{
            state.status = GetLatestUnexpiredRedeemState.initial;
            state.data = undefined;
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(getLatestUnexpiredRedeem.pending, (state: any)=>{
            state.status = GetLatestUnexpiredRedeemState.inProgress;
        }).addCase(getLatestUnexpiredRedeem.fulfilled, (state: any, action : PayloadAction<{message: string, data: RedeemDealModel, next_avialable_redeem?: string, redeem_cooldown?: string}> ) => {
            const data = action.payload.data;

            state.data = data;
            state.next_avialable_redeem = action.payload.next_avialable_redeem;
            state.redeem_cooldown = action.payload.redeem_cooldown;
            state.status = GetLatestUnexpiredRedeemState.success;
        })
    }
});



export const selectGetLatestUnexpiredRedeem = (state : RootState) => state.getLatestUnexpiredRedeem;

export const {resetGetLatestUnexpiredRedeem} = getLatestUnexpiredRedeemSlice.actions;

export default getLatestUnexpiredRedeemSlice.reducer;