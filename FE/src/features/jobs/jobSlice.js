import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {

    const { data } = await api.get(`/api/jobs`)
    return data.jobs
})

export const fetchAppliedJobs = createAsyncThunk("jobs/fetchAppliedJobs", async (page, itemsPerPage) => {
    const { data } = await api.get(`/api/jobs/applied-jobs?page=${page}&limit=${itemsPerPage}`)
    return data.appliedJobs
})


export const fetchSavedJobs = createAsyncThunk("jobs/fetchSavedJobs", async () => {
    const { data } = await api.get("/api/auth/me/saved")
    console.log(data, `trying to get saved job of ajit let see`);
    return data.savedJobs

})

export const postJob = createAsyncThunk("jobs/postJob", async (jobData) => {
    const { data } = await api.post("/api/jobs", jobData)
    return data
})



export const applyJob = createAsyncThunk("jobs/applyJob", async (jobId, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/api/application", { jobId });
        console.log(data);

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Job apply failed" });
    }
});

export const getListedJobs = createAsyncThunk(
    "jobs/getListedJobs",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/api/jobs/listed-jobs");
            return data.listedJobs;
        } catch (error) {
            console.error("API error in getListedJobs:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to get listed jobs" });
        }
    }
);


export const updateJobStatus = createAsyncThunk("jobs/updateJobStatus", async ({ id, status }, { rejectWithValue }) => {
    try {
        const { data } = await api.put(`/api/jobs/${id}/status`, { status });
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Failed to update status" });
    }
});

export const updateApplicationStatus = createAsyncThunk(
    "jobs/updateApplicationStatus",
    async ({ id, applicationStatus }, { rejectWithValue }) => {
        try {
            const { data } = await api.put(`/api/application/${id}/status`, { applicationStatus });
            console.log("Response from API:", data);
            return data; // <-- you must return data here
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to update application status" });
        }
    }
);

export const getReceivedApplicatList = createAsyncThunk("jobs/getReceivedApplicatList", async (jobId, { rejectWithValue }) => {
    console.log(`am i getting job ID`, jobId);

    try {
        const { data } = await api.get(`/api/application/${jobId}`)
        return data

    } catch (error) {
        return rejectWithValue(err.response?.data || { message: "Failed to update status" });
    }
})

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
        status: "idle",
        error: null,
    }
    ,
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

                state.status = "succeeded";
                state.jobs = action.payload;
                // console.log(state.jobs, "state has been updated");
                // console.log(state.status, "state has been updated");

            })
            .addCase(fetchAppliedJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // fetch alll Jobs 
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

        /* ! IMPLEMENT IN future
        // ✅ Handle ALL pending states
        .addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => {
                state.status = "loading";
                state.error = null;
            }
        )

        // ✅ Handle ALL rejected states
        .addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, action) => {
                state.status = "failed";
                state.error = action.error?.message || "Something went wrong";
            }
        );

        */
    }
})

export default jobSlice.reducer;
