import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SetPopclubDataParam } from "features/popclub/core/popclub.params";
import { SetPopClubDataRepository, SetPopClubDataResponse } from "features/popclub/data/repository/popclub.repository";

export enum SetPopClubDataState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: SetPopClubDataState,
    message: string,
} = {
    status: SetPopClubDataState.initial,
    message: '',
}

export const setPopClubData = createAsyncThunk('setPopClubData',
    async (param: SetPopclubDataParam) => {
        const response : SetPopClubDataResponse = await SetPopClubDataRepository(param);
        console.log(response);
        
        return response.data;
    }
)

/* Main Slice */
export const setPopClubDataSlice = createSlice({
    name:'setPopClubData',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(setPopClubData.pending, (state: any)=>{
            state.status = SetPopClubDataState.inProgress;
        }).addCase(setPopClubData.fulfilled, (state: any, action : PayloadAction<{message: string}> ) => {
            const message = action.payload.message;
            
            state.message = message;
            state.status = SetPopClubDataState.success;
        })
    }
});



export const selectSetPopClubData = (state : RootState) => state.setPopClubData;

export default setPopClubDataSlice.reducer;