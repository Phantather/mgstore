import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {instance} from "../../utils/axios";


export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async (_,thunkAPI) => {
        try {
            const res = await axios(`${instance}/categories`)

            return res.data
        }
        catch (err){
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        data:[],
        isLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending,(state,action)  => {
            state.isLoading = true
        });
        builder.addCase(getCategories.fulfilled,(state,action)  => {
            console.log(action)
            state.isLoading = false
            state.data = action.payload
        });
        builder.addCase(getCategories.rejected,state  => {
            state.isLoading = false

        });
    }
})
export default categoriesSlice.reducer