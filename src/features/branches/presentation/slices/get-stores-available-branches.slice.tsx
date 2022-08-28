import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { StoreModel } from "features/shared/core/domain/store.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import { GetStoresAvailableRepository, GetStoresAvailableResponse } from "features/shared/data/repository/shared.repository";

export enum GetStoresAvailableBranchesState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetStoresAvailableBranchesState;
    data: Array<StoreModel>;
    message: string;
} = {
    status: GetStoresAvailableBranchesState.initial,
    data: [],
    message : '',
}

export const getStoresAvailableBranches = createAsyncThunk('getStoresAvailableBranches',
    async (param : GetStoresAvailableParam) => {
        const response : GetStoresAvailableResponse = await GetStoresAvailableRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const getStoresAvailableBranchesSlice = createSlice({
    name:'getStoresAvailableBranches',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getStoresAvailableBranches.pending, (state: any)=>{
            state.status = GetStoresAvailableBranchesState.inProgress;
        }).addCase(getStoresAvailableBranches.fulfilled, (state: any, action : PayloadAction<{message: string, data: Array<StoreModel>}> ) => {
            const {data, message} = action.payload;
            state.status = GetStoresAvailableBranchesState.success;
            
            state.data = data;
            state.message = message;
        }).addCase(getStoresAvailableBranches.rejected, (state: any, action: PayloadAction<{message : string}>) => {
            state.status = GetStoresAvailableBranchesState.fail;
            state.message = action.payload.message;
        })
    }
});



export const selectGetStoresAvailableBranches = (state : RootState) => state.getStoresAvailableBranches;

export default getStoresAvailableBranchesSlice.reducer;