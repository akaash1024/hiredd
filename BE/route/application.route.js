const applicationRoute = require("express").Router()
const applicationController = require("../controller/application.controller")
const isAuthenticated = require("../middleware/isAuthenicated.middleware")

applicationRoute.route("/").post(isAuthenticated, applicationController.applyJob)
applicationRoute.route("/me").get(isAuthenticated, applicationController.getMyApplications)
applicationRoute.route("/:jobId").get(isAuthenticated, applicationController.getJobApplications)



module.exports  = applicationRoute