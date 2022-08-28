import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SessionModel } from "features/shared/core/domain/session.model";
import { FacebookLoginPointParam, UploadProofOfPaymentParam } from "features/shared/core/shared.params";
import { FacebookLoginPointRepository, FacebookLoginPointResponse, FacebookLoginRepository, FacebookLoginResponse, GetSessionRepository, GetSessionResponse, UploadProofOfPaymentRepository, UploadProofOfPaymentResponse} from "features/shared/data/repository/shared.repository";

export enum UploadProofOfPaymentState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: UploadProofOfPaymentState,
    message: string;
} = {
    status: UploadProofOfPaymentState.initial,
    message: '',
}

export const uploadProofOfPayment = createAsyncThunk('uploadProofOfPayment',
    async (param: UploadProofOfPaymentParam, {rejectWithValue, fulfillWithValue}) => {
        try{
            const response : UploadProofOfPaymentResponse = await UploadProofOfPaymentRepository(param);
            return fulfillWithValue(response.data);
        }catch(error : any){
            throw rejectWithValue({message: error.response.data.message});
        }
    }
)

/* Main Slice */
export const uploadProofOfPaymentSlice = createSlice({
    name:'uploadProofOfPayment',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(uploadProofOfPayment.pending, (state: any)=>{
            state.status = UploadProofOfPaymentState.inProgress;
        }).addCase(uploadProofOfPayment.fulfilled, (state: any, action: PayloadAction<{message: string}>) => {
            const { message } = action.payload;

            state.status = UploadProofOfPaymentState.success;
            state.message = message;
        }).addCase(uploadProofOfPayment.rejected, (state: any, action: PayloadAction<{message: string}>)=>{
            const { message } = action.payload;

            state.status = UploadProofOfPaymentState.fail;
            state.message = message;
        });
    }
});



export const selectUploadProofOfPayment = (state : RootState) => state.uploadProofOfPayment;

export default uploadProofOfPaymentSlice.reducer;