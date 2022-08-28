import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SessionModel } from "features/shared/core/domain/session.model";
import { FacebookLoginPointParam } from "features/shared/core/shared.params";
import { FacebookLoginPointRepository, FacebookLoginPointResponse, FacebookLoginRepository, FacebookLoginResponse, GetSessionRepository, GetSessionResponse, RemoveItemFromCartRepository, RemoveItemFromCartResponse} from "features/shared/data/repository/shared.repository";

export enum RemoveItemFromCartState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: RemoveItemFromCartState,
    message: string;
} = {
    status: RemoveItemFromCartState.initial,
    message: '',
}

export const removeItemFromCart = createAsyncThunk('removeItemFromCart',
    async (param: number) => {
        const response : RemoveItemFromCartResponse = await RemoveItemFromCartRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const removeItemFromCartSlice = createSlice({
    name:'removeItemFromCart',
    initialState,
    reducers : {
        resetRemoveItemFromCart: (state) =>{
            state.status = RemoveItemFromCartState.initial;
            state.message = '';
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(removeItemFromCart.pending, (state: any)=>{
            state.status = RemoveItemFromCartState.inProgress;
        }).addCase(removeItemFromCart.fulfilled, (state: any, action: PayloadAction<{message: string;}>) => {
            const { message } = action.payload;

            state.status = RemoveItemFromCartState.success;
            state.message = message;
        }).addCase(removeItemFromCart.rejected, (state: any, action: PayloadAction<{message: string;}> )=>{
            const { message } = action.payload;
            
            state.status = RemoveItemFromCartState.fail;
            state.message = message;
        });
    }
});



export const selectRemoveItemFromCart = (state : RootState) => state.removeItemFromCart;

export const { resetRemoveItemFromCart } = removeItemFromCartSlice.actions;

export default removeItemFromCartSlice.reducer;