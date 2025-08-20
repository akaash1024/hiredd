const Application = require("../model/application.model");
const JobModel = require("../model/job.model");



const createJob = async (req, res, next) => {
    try {
        const { title, description, skills, location, salaryRange, company, jobType } = req.body;
        const newJob = await JobModel.create({ title, description, skills, location, salaryRange, company, jobType, createdBy: req.user._id, });
        res.status(201).json({ success: true, message: "Job created Successfully", job: newJob });
    } catch (error) {
        next(error)
    }
}

const getJobsWithStatus = async (req, res, next) => {
    try {
        const { page = 1, limit = 25 } = req.query;
        const skip = (page - 1) * parseInt(limit);

        // 1. Get paginated jobs
        const jobs = await JobModel.find({ status: "Open" })
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        // 2. Get applications of this user for these jobs
        const applications = await Application.find({
            applicant: req.user._id,
            jobId: { $in: jobs.map(j => j._id) }
        }).select("jobId");

        const appliedJobIds = applications.map(app => app.jobId.toString());

        // 3. Merge applied flag
        const jobsWithStatus = jobs.map(job => ({
            ...job.toObject(),
            applied: appliedJobIds.includes(job._id.toString())
        }));

        res.json({
            success: true,
            message: "Jobs with status fetched successfully",
            jobs: jobsWithStatus,
            page: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/jobs/applied
const getAppliedJobs = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * parseInt(limit);

        // 1. Get applications by this user
        const applications = await Application.find({ applicant: req.user._id })
            .skip(skip)
            .limit(parseInt(limit))
            .select("jobId")
            .sort({ createdAt: -1 });

        const jobIds = applications.map(app => app.jobId);

        // 2. Fetch jobs for those applications
        const jobs = await JobModel.find({ _id: { $in: jobIds } });

        // 3. Mark all as applied:true (since these are applied ones)
        const appliedJobs = jobs.map(job => ({
            ...job.toObject(),
            applied: true
        }));

        res.json({
            success: true,
            appliedJobs: appliedJobs,
            page: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        next(error);
    }
};



const getListedJobs = async (req, res, next) => {
    try {

        const listedJobs = await JobModel.find({ createdBy: req.userId });

        res.status(200).json({
            success: true,
            listedJobs,
        });
    } catch (error) {
        next(error);
    }
};
const updateJobStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const job = await JobModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found", })
        }

        res.json({
            success: true,
            message: "Job status updated successfully",
            job,
        });
    } catch (error) {
        next(error);
    }
};



const getJobById = async (req, res, next) => {
    try {
        const job = await JobModel.findById(req.params.id).populate("createdBy", "name email")
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });
        res.json({ success: true, job, message: "Job found successfully" });
    } catch (error) {
        next(error)
    }
}


// Update job
const updateJob = async (req, res, next) => {
    try {
        const job = await JobModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });

        res.json({ success: true, job, message: "Job update successfully" });
    } catch (error) {
        next(error)
    }
};

// Delete job
const deleteJob = async (req, res, next) => {
    try {
        const job = await JobModel.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });

        res.json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    createJob,

    getJobById,
    updateJob,
    deleteJob,
    getJobsWithStatus,
    getAppliedJobs,
    getListedJobs,
    updateJobStatus

}