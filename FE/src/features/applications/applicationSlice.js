// src/features/applications/applicationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios"

export const fetchApplications = createAsyncThunk(
    "applications/fetchApplications",
    async () => {
        const res = await api.get("/applications");
        return res.data;
    }
);

export const submitApplication = createAsyncThunk(
    "applications/submitApplication",
    async (appData) => {
        const res = await api.post("/applications", appData);
        return res.data;
    }
);

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        applications: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchApplications.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.applications = action.payload;
            })
            .addCase(fetchApplications.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(submitApplication.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(submitApplication.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.applications.push(action.payload);
            })
            .addCase(submitApplication.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

    },
});

export default applicationSlice.reducer;
