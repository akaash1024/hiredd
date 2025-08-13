const isAuthenicated = require("../middleware/isAuthenicated.middleware")
const jobController = require("../controller/job.controller")


const jobRoute = require("express").Router()

jobRoute.route("/").post(isAuthenicated, jobController.createJob)
jobRoute.route("/").get(jobController.getAllJobs)
jobRoute.route("/:id").get(jobController.getJobById)
jobRoute.route("/:id").patch(isAuthenicated, jobController.updateJob)
jobRoute.route("/:id").delete(isAuthenicated, jobController.deleteJob)

module.exports = jobRoute