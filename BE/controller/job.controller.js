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

const getAllJobs = async (req, res, next) => {

    try {
        const jobs = await JobModel.find().populate("createdBy", "name email")
        res.json({ success: true, message: "Jobs fetched successfully", jobs })
    } catch (error) {
        next(error)
    }
}

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
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
}