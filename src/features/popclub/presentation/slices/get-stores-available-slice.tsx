import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { StoreModel } from "features/popclub/core/domain/store.model";
import { GetStoresAvailableParam } from "features/popclub/core/popclub.params";
import { GetStoresAvailableRepository, GetStoresAvailableResponse } from "features/popclub/data/repository/popclub.repository";

export enum GetStoresAvailableState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetStoresAvailableState,
    data: Array<StoreModel>
} = {
    status: GetStoresAvailableState.initial,
    data: [],
}

export const getStoresAvailable = createAsyncThunk('getStoresAvailable',
    async (param : GetStoresAvailableParam) => {
        const response : GetStoresAvailableResponse = await GetStoresAvailableRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const getStoresAvailableSlice = createSlice({
    name:'getStoresAvailable',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getStoresAvailable.pending, (state: any)=>{
            state.status = GetStoresAvailableState.inProgress;
        }).addCase(getStoresAvailable.fulfilled, (state: any, action : PayloadAction<{message: string, data: Array<StoreModel>}> ) => {
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetStoresAvailableState.success;
        });
    }
});



export const selectGetStoresAvailable = (state : RootState) => state.getStoresAvailable;

export default getStoresAvailableSlice.reducer;