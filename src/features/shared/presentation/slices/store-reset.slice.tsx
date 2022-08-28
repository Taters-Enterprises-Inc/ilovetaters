import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SessionModel } from "features/shared/core/domain/session.model";
import { FacebookLoginPointParam } from "features/shared/core/shared.params";
import { FacebookLoginPointRepository, FacebookLoginPointResponse, FacebookLoginRepository, FacebookLoginResponse, GetSessionRepository, GetSessionResponse, StoreResetRepository, StoreResetResponse} from "features/shared/data/repository/shared.repository";

export enum StoreResetState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: StoreResetState,
} = {
    status: StoreResetState.initial,
}

export const storeReset = createAsyncThunk('storeReset',
    async () => {
        const response : StoreResetResponse = await StoreResetRepository();
        return response.data;
    }
)

/* Main Slice */
export const storeResetSlice = createSlice({
    name:'storeResetSlice',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(storeReset.pending, (state: any)=>{
            state.status = StoreResetState.inProgress;
        }).addCase(storeReset.fulfilled, (state: any) => {
            state.status = StoreResetState.success;
        }).addCase(storeReset.rejected, (state: any)=>{
            state.status = StoreResetState.fail;
        });
    }
});



export const selectStoreReset = (state : RootState) => state.storeReset;

export default storeResetSlice.reducer;