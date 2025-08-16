

const userRoute = require("express").Router()
const isinfoValidate = require("../middleware/isinfoValidate.middleware");
const { signupSchema, loginSchema } = require("../validator/auth-validation.schema");
const userController = require("../controller/user.controller");
const upload = require("../middleware/multer.middleware");
const isAuthenticated = require("../middleware/isAuthenicated.middleware");

userRoute.get("/set-cookie", (req, res) => {
    res.cookie("token", "0rx30pt6jh", {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Cookie has been set" });
});

userRoute.route("/register").post(upload.single("avatar"), userController.register)
userRoute.route("/login").post(userController.login)
userRoute.route("/logout").get(userController.logout) // ! maybe i kept it too post instead of get


userRoute.route("/").get(userController.getAllUser)



userRoute.route("/me").get(isAuthenticated, userController.user);

userRoute.route("/save-job").post(isAuthenticated, userController.saveJob)
userRoute.route("/me/saved").get(isAuthenticated, userController.getMySavedJobs);

module.exports = userRoute

