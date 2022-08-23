import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import {  SetStoreAndAddressParm } from "features/shared/core/shared.params";
import { SetStoreAndAddressRepository, SetStoreAndAddressResponse } from "features/shared/data/repository/shared.repository";

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
export const setStoreAndAddressSlice = createSlice({
    name:'setStoreAndAddress',
    initialState,
    reducers : {
        resetStoreAndAddress: (state)=>{
            state.status = SetStoreAndAddressState.initial;
            state.message = '';
        }
    },
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
export const {resetStoreAndAddress} = setStoreAndAddressSlice.actions;
export default setStoreAndAddressSlice.reducer;
