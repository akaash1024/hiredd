require("dotenv").config()
const express = require("express")
const connectDB = require("./database/connectDB")
const errorHandler = require("./middleware/errorHandler.middleware")
const userRoute = require("./route/user.route")
const cookieParser = require("cookie-parser");


const jobRoute = require("./route/job.route")
const applicationRoute = require("./route/application.route")


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());



app.use("/api/auth", userRoute)
app.use("/api/job", jobRoute)
app.use("/api/application", applicationRoute)


// error handing part
app.use(errorHandler)
const PORT = process.env.PORT
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️ Server is running at http://localhost:${PORT}/`);
    })
})