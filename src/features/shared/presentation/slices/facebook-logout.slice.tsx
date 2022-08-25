import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SessionModel } from "features/shared/core/domain/session.model";
import { FacebookLoginPointParam } from "features/shared/core/shared.params";
import { FacebookLoginPointRepository, FacebookLoginPointResponse, FacebookLoginRepository, FacebookLoginResponse, FacebookLogoutRepository, FacebookLogoutResponse, GetSessionRepository, GetSessionResponse} from "features/shared/data/repository/shared.repository";

export enum FacebookLogoutState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: FacebookLogoutState,
} = {
    status: FacebookLogoutState.initial,
}

export const facebookLogout = createAsyncThunk('facebookLogout',
    async () => {
        const response : FacebookLogoutResponse = await FacebookLogoutRepository();
        return response.data;
    }
)

/* Main Slice */
export const facebookLogoutSlice = createSlice({
    name:'facebookLogout',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(facebookLogout.pending, (state: any)=>{
            state.status = FacebookLogoutState.inProgress;
        }).addCase(facebookLogout.fulfilled, (state: any) => {
            state.status = FacebookLogoutState.success;
        }).addCase(facebookLogout.rejected, (state: any)=>{
            state.status = FacebookLogoutState.fail;
        });
    }
});



export const selectFacebookLogout = (state : RootState) => state.facebookLogout;

export default facebookLogoutSlice.reducer;