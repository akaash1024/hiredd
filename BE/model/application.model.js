const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema(
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "JobModel", required: true, },
        applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
        status: { type: String, enum: ["Applied", "Reviewed", "Interview", "Offered", "Rejected"], default: "Applied", },
        resumeUrl: { type: String, required: true, },
    },
    { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema)
module.exports = Application