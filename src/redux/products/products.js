import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {instance} from "../../utils/axios"

export const getProduct = createAsyncThunk(
    "products/getProducts",
    async (_, thunkAPI) => {
        try {
            const res = await axios(`${instance}/products`)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }

    }
)

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (productID) => {
        await axios.delete(`${instance}/products/${productID}`)
        return productID
    }
)
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (productID) => {
        await axios.put(`${instance}/products/${productID.id}`,productID)
        console.log(productID)
        return productID
    }
)


export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (newProduct) => {
        const res = await axios.post(`${instance}/products`, newProduct)
        return res.data
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState: {
        data: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProduct.fulfilled, (state, {payload}) => {
            state.data = payload
            state.isLoading = false
        })
        builder.addCase(getProduct.rejected, (state) => {
            state.isLoading = false
        })
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true
            state.error = false
        })
        builder.addCase(deleteProduct.fulfilled, (state,{payload}) => {
            state.isLoading = false
            state.data = state.data.filter((item) => item.id !== payload)
        })
        builder.addCase(deleteProduct.rejected, (state,{payload}) => {
            state.isLoading = false
            state.error = payload.error.message
        })
        builder.addCase(addProduct.pending, (state) => {
            state.isLoading = true
            state.error = false
        })
        builder.addCase(addProduct.fulfilled, (state,{payload}) => {
            state.isLoading = false
            state.data.push(payload)
        })
        builder.addCase(addProduct.rejected, (state,{payload}) => {
            state.isLoading = false
            state.error = payload.error.message
        })
        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true
            state.error = false
        })
        builder.addCase(updateProduct.fulfilled, (state,{payload}) => {
            state.isLoading = false
            state.data.map(item => item.id == payload.id ? payload : item)
        })
        builder.addCase(updateProduct.rejected, (state,{payload}) => {
            state.isLoading = false
            state.error = payload.error.message
        })
    }
})

export default productsSlice.reducer