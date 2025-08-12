const mongoose = require("mongoose")

const connectDB = async () => {
    const URI = process.env.MONGO_URL
    try {
        await mongoose.connect(URI)
        console.log(`Connected to server `)

    } catch (error) {
        console.error("is that", error.message)
        process.exit(0)
    }
}

module.exports = connectDB