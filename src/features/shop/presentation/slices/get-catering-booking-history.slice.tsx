import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { CateringBookingModel } from "features/shop/core/domain/catering-booking.model";
import { SnackShopOrderModel } from "features/shop/core/domain/snackshop-order.model";
import { GetCateringBookingHistoryRepository, GetCateringBookingHistoryResponse, GetSnackShopOrderHistoryRepository, GetSnackShopOrderHistoryResponse } from "features/shop/data/repository/shop.repository";


export enum GetCateringBookingHistory{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetCateringBookingHistory,
    data: Array<CateringBookingModel> | undefined,
} = {
    status: GetCateringBookingHistory.initial,
    data: undefined
}

export const getCateringBookingHistory = createAsyncThunk('getCateringBookingHistory',
    async () => {
        const response : GetCateringBookingHistoryResponse = await GetCateringBookingHistoryRepository();
        return response.data;
    }
)

/* Main Slice */
export const getCateringBookingHistorySlice = createSlice({
    name:'getCateringBookingHistory',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getCateringBookingHistory.pending, (state: any)=>{
            state.status = GetCateringBookingHistory.inProgress;
        }).addCase(getCateringBookingHistory.fulfilled, (state: any, action : PayloadAction<{message: string, data: Array<CateringBookingModel> | null}> ) => {
                
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetCateringBookingHistory.success;
        })
    }
});



export const selectGetCateringBookingHistory = (state : RootState) => state.getCateringBookingHistory;

export default getCateringBookingHistorySlice.reducer;