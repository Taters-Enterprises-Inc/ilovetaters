import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SetPopclubDataParam, SetStoreAndAddressParm } from "features/popclub/core/popclub.params";
import { SetPopClubDataRepository, SetPopClubDataResponse, SetStoreAndAddressRepository, SetStoreAndAddressResponse } from "features/popclub/data/repository/popclub.repository";

export enum SetStoreAndAddressState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: SetStoreAndAddressState,
    message: string,
} = {
    status: SetStoreAndAddressState.initial,
    message: '',
}

export const setStoreAndAddress = createAsyncThunk('setStoreAndAddress',
    async (param: SetStoreAndAddressParm) => {
        const response : SetStoreAndAddressResponse = await SetStoreAndAddressRepository(param);
        
        return response.data;
    }
)

/* Main Slice */
export const setStoreAndAddressSlice = createSlice({
    name:'setStoreAndAddress',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(setStoreAndAddress.pending, (state: any)=>{
            state.status = SetStoreAndAddressState.inProgress;
        }).addCase(setStoreAndAddress.fulfilled, (state: any, action : PayloadAction<{message: string}> ) => {
            const message = action.payload.message;
            
            state.message = message;
            state.status = SetStoreAndAddressState.success;
        })
    }
});



export const selectSetStoreAndAddress = (state : RootState) => state.setStoreAndAddress;

export default setStoreAndAddressSlice.reducer;
