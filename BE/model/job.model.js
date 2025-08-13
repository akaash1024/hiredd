const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, },
        description: { type: String, required: true, },
        skills: { type: [String], required: true, },
        location: { type: String, required: true, },
        salaryRange: { min: Number, max: Number, },
        company: { type: String, required: true, },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
        jobType: { type: String, enum: ["Full-time", "Part-time", "Internship", "Contract"], default: "Full-time", },
        status: { type: String, enum: ["Open", "Closed"], default: "Open", },
    },
    { timestamps: true }
);

const JobModel = mongoose.model("JobModel", jobSchema)
module.exports = JobModel