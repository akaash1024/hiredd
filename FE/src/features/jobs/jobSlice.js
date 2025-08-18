import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
    const { data } = await api.get("/api/job")
    console.log(data);

    return data.jobs
})
export const applyJob = createAsyncThunk("jobs/applyJob", async (jobId, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/api/application", { jobId });
        console.log("applyJob response:", data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Job apply failed" });
    }
});


export const fetchAppliedJobs = createAsyncThunk("jobs/fetchAppliedJobs", async () => {
    const { data } = await api.get("/api/application/me")
    return data.applications
})

export const fetchSavedJobs = createAsyncThunk("jobs/fetchSavedJobs", async () => {
    const { data } = await api.get("/api/auth/me/saved")
    console.log(data, `trying to get saved job of ajit let see`);
    return data.savedJobs

})

export const postJob = createAsyncThunk("jobs/postJob", async (jobData) => {
    const { data } = await api.post("/api/job", jobData)
    return data
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
            // apply job
            .addCase(applyJob.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(applyJob.fulfilled, (state, action) => {
                state.status = "succeeded"
            })
            .addCase(applyJob.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message;
            })

            // fetch saved jobs
            .addCase(fetchSavedJobs.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchSavedJobs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobs = action.payload
            })
            .addCase(fetchSavedJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // Fetch applied jobs
            .addCase(fetchAppliedJobs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
                console.log(`From Slice`, action.payload);
                state.status = "succeeded";
                state.jobs = action.payload;
                // console.log(state.jobs, "state has been updated");
                // console.log(state.status, "state has been updated");

            })
            .addCase(fetchAppliedJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

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
            // postJob
            .addCase(postJob.pending, (state) => {
                state.status = "loading"
            })
            .addCase(postJob.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.jobs.push(action.payload.job)
            })
            .addCase(postJob.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })

    }
})

export default jobSlice.reducer;
