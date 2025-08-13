import { configureStore } from "@reduxjs/toolkit";

import userReducers from "../features/users/userSlice"
import jobReducers from "../features/jobs/jobSlice"
import applicationReducers from "../features/applications/applicationSlice"


export const store = configureStore(
    {
        reducer: {
            users: userReducers,
            jobs: jobReducers,
            applications: applicationReducers
        }
    }
)