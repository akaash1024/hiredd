import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
    const res = await api.get("/jobs")
    return res.data
})

export const addJob = createAsyncThunk("jobs/addJob", async (jobData) => {
    const res = await api.post("/jobs", jobData)
    return res.data
})


const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchJobs
            .addCase(fetchJobs.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.jobs = action.payload
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            // addJob
            .addCase(addJob.pending, (state) => {
                state.status = "loading"
            })
            .addCase(addJob.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.jobs.push(action.payload)
            })
            .addCase(addJob.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })

    }
})

export default jobSlice.reducer;
