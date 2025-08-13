import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios"



export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", async () => {
    const { data } = await api.get("/me")
    return data
})

export const loginUser = createAsyncThunk("users/loginUser", async (credentals) => {
    const { data } = await api.post("/login", credentals)
    return data
})

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
    await api.get("/logout")
    return null
})


const usersSlice = createSlice({
    name: "users",
    initialState: {
        currentUser: null,
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchCurrentUser
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.currentUser = action.payload
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.currentUser = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            // logoutUser
            .addCase(logoutUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = "succeeded"
                state.currentUser = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }

})

export default usersSlice.reducer