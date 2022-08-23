import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SessionModel } from "features/shared/core/domain/session.model";
import { FacebookLoginRepository, FacebookLoginResponse, GetSessionRepository, GetSessionResponse} from "features/shared/data/repository/shared.repository";

export enum FacebookLoginState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: FacebookLoginState,
    result: boolean | undefined;
    url: string | undefined;
} = {
    status: FacebookLoginState.initial,
    result: undefined,
    url: undefined,
}

export const facebookLogin = createAsyncThunk('facebookLogin',
    async () => {
        const response : FacebookLoginResponse = await FacebookLoginRepository();
        return response.data;
    }
)

/* Main Slice */
export const facebookLoginSlice = createSlice({
    name:'facebookLogin',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(facebookLogin.pending, (state: any)=>{
            state.status = FacebookLoginState.inProgress;
        }).addCase(facebookLogin.fulfilled, (state: any, action : PayloadAction<{result: boolean, url: string}> ) => {
            const {result, url} = action.payload;
            
            state.result = result;
            state.url = url;
            state.status = FacebookLoginState.success;
        }).addCase(facebookLogin.rejected, (state: any, action : PayloadAction<{result: boolean; url: string}>)=>{
            state.status = FacebookLoginState.fail;
        });
    }
});



export const selectFacebookLogin = (state : RootState) => state.facebookLogin;

export default facebookLoginSlice.reducer;