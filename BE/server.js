require("dotenv").config()
const express = require("express")
const connectDB = require("./database/connectDB")
const errorHandler = require("./middleware/errorHandler.middleware")
const userRoute = require("./route/user.route")
const cookieParser = require("cookie-parser");

const cors = require("cors");


const jobRoute = require("./route/job.route")
const applicationRoute = require("./route/application.route")


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

/*
app.use(cors({
    origin: "http://localhost:5173", // your React app
    credentials: true                // allow cookies
}));

*/

// need to change from here
// CORS configuration
const whitelist = [process.env.FE_URL, process.env.DEPLOY_FE_URL];
const corsOptionsDelegate = (req, callback) => {
    const origin = req.header("Origin");
    if (whitelist.includes(origin) || !origin) {
        callback(null, {
            origin: true,
            credentials: true,
            methods: "GET,HEAD,PATCH,POST,PUT,DELETE",
            allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        });
    } else {
        callback(null, { origin: false });
    }
};
app.use(cors(corsOptionsDelegate));

//

app.use("/", (req, res) => {
    console.log(res.body)
    return res.status(200).json({ message: 'yes i m coming back form server' })
})


app.use("/api/auth", userRoute)
app.use("/api/job", jobRoute)
app.use("/api/application", applicationRoute)

// app.use("/", (req, res) => res.status(200).json({ message: 'done' }))

// error handing part
app.use(errorHandler)
const PORT = process.env.PORT
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️ Server is running at http://localhost:${PORT}/`);
    })
})