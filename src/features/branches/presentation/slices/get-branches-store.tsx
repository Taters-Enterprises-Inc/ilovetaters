import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BranchesStoreModel } from "features/branches/core/domain/branches-store.model";
import { GetBranchesStoreRepository, GetBranchesStoreResponse } from "features/branches/data/repository/branches.repository";
import { RootState } from "features/config/store";



//inumerate the status of fecthing data
export enum GetBrachesStore{
    initial,
    inProgress,
    success,
    fail
}

//initizalize the state
const initialState : {
    status: GetBrachesStore,
    data: Array<{
        ncr: Array<BranchesStoreModel>;
        luzon: Array<BranchesStoreModel>;
        visayas: Array<BranchesStoreModel>;
        mindanao: Array<BranchesStoreModel>;
    }> | undefined;
} = {
    status: GetBrachesStore.initial,
    data: undefined
}
//createAsyncThunk asyncronous function for builder , addCase first args  and use for dispatch
export const getBranchesStore = createAsyncThunk('getBranchesStore',
    async () => {
        const response : GetBranchesStoreResponse = await GetBranchesStoreRepository(); // fetchfunction
        return response.data;
    }
)

/* Main Slice */
export const getBranchesStoreSlice = createSlice({
    name:'addToCart',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getBranchesStore.pending, (state: any)=>{
            state.status = GetBrachesStore.inProgress;
        }).addCase(getBranchesStore.fulfilled, (state: any, action : PayloadAction<{message: string, data: Array<{
            ncr: Array<BranchesStoreModel>;
            luzon: Array<BranchesStoreModel>;
            visayas: Array<BranchesStoreModel>;
            mindanao: Array<BranchesStoreModel>;
        }> | undefined}> ) => {
                
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetBrachesStore.success;
        })
    }
});


//state if u want to get the value is inclue for args of useSelector
export const selectGetBranchesStore = (state : RootState) => state.getBranchesStore;

// reducer
export default getBranchesStoreSlice.reducer;