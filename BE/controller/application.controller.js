const Application = require("../model/application.model");
const JobModel = require("../model/job.model");


// Apply to a job
const applyJob = async (req, res, next) => {
    try {
        const { jobId } = req.body;

        // Check if job exists
        const job = await JobModel.findById(jobId);
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });

        // Check if already applied
        const alreadyApplied = await Application.findOne({ jobId, applicant: req.user._id });

        if (alreadyApplied) {
            return res.status(400).json({ success: false, message: "You already applied to this job" });
        }

        const newApplication = await Application.create({
            jobId: jobId,
            applicant: req.user._id,
            resumeUrl: req.user.profile.resumeUrl
        });

        res.status(201).json({ success: true, application: newApplication, message: "Applied Successfully" });
    } catch (error) {
        next(error)
    }
};

// Get applications for logged-in user
const getMyApplications = async (req, res, next) => {
    try {
        const applications = await Application.find({ applicant: req.user._id })
            .populate("jobId")
            .sort({ createdAt: -1 });

        res.json({ success: true, applications, message: "My applications fetched successfully" });
    } catch (error) {
        next(error)
    }
};

// Get all applications for a job (Recruiter/Admin)
const getJobApplications = async (req, res, next) => {
    try {
        const applications = await Application.find({ jobId: req.params.jobId })
            .populate("applicant", "name email")
            .populate("jobId");

        res.json({ success: true, applications, message: "Total applicats fetched successfully" });
    } catch (error) {
        next(error)
    }
};


module.exports = {
    applyJob,
    getMyApplications,
    getJobApplications
}