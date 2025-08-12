const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["candidate", "hirer"], default: "candidate", required: true },
        profile: { headline: String, skills: [String], location: String, bio: String, resumeUrl: String },
        avatar: { type: String, required: true },
        company: { name: String, website: String, description: String, logoUrl: String },
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)


userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next()
    try {
        const saltRound = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, saltRound)
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function () {
    let user = this;
    try {
        return jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );
    } catch (error) {
        console.error(error);
        throw new Error("Token generation failed");
    }
};



const User = mongoose.model("User", userSchema)
module.exports = User;