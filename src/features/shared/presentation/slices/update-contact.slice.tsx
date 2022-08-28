import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SessionModel } from "features/shared/core/domain/session.model";
import { AddContactParam, DeleteContactParam, FacebookLoginPointParam, UpdateContactParam } from "features/shared/core/shared.params";
import { AddContactRepository, AddContactResponse, DeleteContactRepository, DeleteContactResponse, FacebookLoginPointRepository, FacebookLoginPointResponse, FacebookLoginRepository, FacebookLoginResponse, GetSessionRepository, GetSessionResponse, UpdateContactRepository, UpdateContactResponse} from "features/shared/data/repository/shared.repository";

export enum UpdateContactState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: UpdateContactState,
    message: string,
} = {
    status: UpdateContactState.initial,
    message: ''
}

export const updateContact = createAsyncThunk('updateContact',
    async (param: UpdateContactParam) => {
        const response : UpdateContactResponse = await UpdateContactRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const updateContactSlice = createSlice({
    name:'updateContact',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(updateContact.pending, (state: any)=>{
            state.status = UpdateContactState.inProgress;
        }).addCase(updateContact.fulfilled, (state: any, action : PayloadAction<{message: string}>) => {
            state.message = action.payload.message;
            state.status = UpdateContactState.success;
        }).addCase(updateContact.rejected, (state: any, action : PayloadAction<{message: string}>) => {
            state.message = action.payload.message;
            state.status = UpdateContactState.fail;
        });
    }
});



export const selectUpdateContact = (state : RootState) => state.updateContact;

export default updateContactSlice.reducer;