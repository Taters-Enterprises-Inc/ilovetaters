

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SetPopclubDataParam, SetSessionParam, SetStoreAndAddressParm } from "features/popclub/core/popclub.params";
import { SetSessionRepository, SetSessionResponse } from "features/shared/data/repository/shared.repository";

export enum SetSessionState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: SetSessionState,
    message: string,
} = {
    status: SetSessionState.initial,
    message: '',
}

export const setSession = createAsyncThunk('setSession',
    async (param: SetSessionParam) => {
        const response : SetSessionResponse = await SetSessionRepository(param);
        
        return response.data;
    }
)

/* Main Slice */
export const setSessionSlice = createSlice({
    name:'setSession',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(setSession.pending, (state: any)=>{
            state.status = SetSessionState.inProgress;
        }).addCase(setSession.fulfilled, (state: any, action : PayloadAction<{message: string}> ) => {
            const message = action.payload.message;
            
            state.message = message;
            state.status = SetSessionState.success;
        })
    }
});



export const selectSetSession = (state : RootState) => state.setSession;

export default setSessionSlice.reducer;