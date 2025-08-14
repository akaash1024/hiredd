import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/api/auth/me");
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Failed to fetch user" });
    }
});

export const loginUser = createAsyncThunk("users/loginUser", async (credentials, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/api/auth/login", credentials);
        console.log(data);
        
        return data; // { message, user }
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
});

export const logoutUser = createAsyncThunk("users/logoutUser", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/api/auth/logout");
        console.log(data);

        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Logout failed" });
    }
});

const usersSlice = createSlice({
    name: "users",
    initialState: {
        currentUser: null,
        status: "idle",
        error: null,
        message: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchCurrentUser
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentUser = action.payload.userData;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Error fetching user";
            })

            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentUser = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Login failed";
            })

            // logoutUser
            .addCase(logoutUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentUser = null;
                state.message = action.payload?.message;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Logout failed";
            });
    }
});

export default usersSlice.reducer;
