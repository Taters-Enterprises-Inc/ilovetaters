import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { StoreModel } from "features/shared/core/domain/store.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import { GetStoresAvailableRepository, GetStoresAvailableResponse } from "features/shared/data/repository/shared.repository";

export enum GetStoresAvailableSnackshopState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetStoresAvailableSnackshopState;
    data: Array<StoreModel>;
    message: string;
} = {
    status: GetStoresAvailableSnackshopState.initial,
    data: [],
    message : '',
}

export const getStoresAvailableSnackshop = createAsyncThunk('getStoresAvailableSnackshop',
    async (param : GetStoresAvailableParam) => {
        const response : GetStoresAvailableResponse = await GetStoresAvailableRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const getStoresAvailableSnackshopSlice = createSlice({
    name:'getStoresAvailableSnackshop',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getStoresAvailableSnackshop.pending, (state: any)=>{
            state.status = GetStoresAvailableSnackshopState.inProgress;
        }).addCase(getStoresAvailableSnackshop.fulfilled, (state: any, action : PayloadAction<{message: string, data: Array<StoreModel>}> ) => {
            const {data, message} = action.payload;
            state.status = GetStoresAvailableSnackshopState.success;
            
            state.data = data;
            state.message = message;
        }).addCase(getStoresAvailableSnackshop.rejected, (state: any, action: PayloadAction<{message : string}>) => {
            state.status = GetStoresAvailableSnackshopState.fail;
            state.message = action.payload.message;
        })
    }
});



export const selectGetStoresAvailableSnackshop = (state : RootState) => state.getStoresAvailableSnackshop;

export default getStoresAvailableSnackshopSlice.reducer;