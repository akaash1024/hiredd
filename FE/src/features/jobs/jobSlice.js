import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
    const {data} = await api.get("/api/job")
    console.log(`logged form slice`, data.jobs);
    return data.jobs
})

export const addJob = createAsyncThunk("jobs/addJob", async (jobData) => {
    const { data } = await api.post("/jobs", jobData)
    
    
    return data.jobs
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
                console.log(`is added to jobstate?`, state.jobs);
                
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
