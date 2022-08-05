import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SessionModel } from "features/popclub/core/domain/session.model";
import { GetSessionRepository, GetSessionResponse} from "features/popclub/data/repository/popclub.repository";

export enum GetSessionState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetSessionState,
    data: SessionModel | undefined
} = {
    status: GetSessionState.initial,
    data: undefined,
}

export const getSession = createAsyncThunk('getSession',
    async () => {
        const response : GetSessionResponse = await GetSessionRepository();
        return response.data;
    }
)

/* Main Slice */
export const getSessionSlice = createSlice({
    name:'getStoresAvailable',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getSession.pending, (state: any)=>{
            state.status = GetSessionState.inProgress;
        }).addCase(getSession.fulfilled, (state: any, action : PayloadAction<{message: string, data: SessionModel}> ) => {
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetSessionState.success;
        })
    }
});



export const selectGetSession = (state : RootState) => state.getSession;

export default getSessionSlice.reducer;