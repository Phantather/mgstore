import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../utils/axios";
import axios from "axios";


export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.put(`${instance}/users/${payload.id}`, {...payload});
            console.log(payload)
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState:{
        user:{
            email: localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")).email : "",
            avatar:localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")).avatar : "",
            id:localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")).id : "",
            login:localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")).login : "",
            password:localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")).password : "",
        },
        cart:[]
    },
    reducers:{

        loginAcc: (state,{payload}) => {
            state.user = payload
        },

        logOutAcc: (state,{payload}) => {
            state.user = {
                email: "",
                avatar: "",
                name:'',
            }
        },
        addCart: (state,{payload}) => {

            state.cart.find(item => item.id === payload.id) ?
                state.cart = state.cart.map(item => item.id === payload.id ? {...payload,count:item.count + 1} : item)
                :state.cart = [...state.cart,{...payload,count:1}]
            localStorage.setItem("cart",JSON.stringify({
                ...state.cart
            }))
        },
        deleteCard: (state,{payload}) => {
            state.cart = state.cart.filter(item => item.id !== payload.id)
        },
        addCount:(state,{payload}) => {
            state.cart = state.cart.map(item => item.id === payload.id ? {...payload,count:item.count + 1} : item)
        },
        deleteCount:(state,{payload}) => {

            state.cart = state.cart.map(item => item.id === payload.id ? {...payload,count:item.count !==  1 ? item.count - 1 : 1 } : item)
        }
    }
})
export const {loginAcc,logOutAcc,addCart,deleteCard,addCount,deleteCount} = userSlice.actions
export default userSlice.reducer