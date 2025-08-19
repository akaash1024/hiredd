const isAuthenicated = require("../middleware/isAuthenicated.middleware")
const jobController = require("../controller/job.controller")


const jobsRoute = require("express").Router()

jobsRoute.route("/").post(isAuthenicated, jobController.createJob)
jobsRoute.route("/").get(isAuthenicated,jobController.getJobsWithStatus)
jobsRoute.route("/applied-jobs").get(isAuthenicated,jobController.getAppliedJobs)

jobsRoute.route("/listed-jobs").get(isAuthenicated,jobController.getListedJobs)

jobsRoute.route("/:id/status").put(isAuthenicated, jobController.updateJobStatus)


jobsRoute.route("/:id").get(jobController.getJobById)
jobsRoute.route("/:id").patch(isAuthenicated, jobController.updateJob)
jobsRoute.route("/:id").delete(isAuthenicated, jobController.deleteJob)

module.exports = jobsRoute