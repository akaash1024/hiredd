const User = require("../model/user.model");
const uploadOnCloudinary = require("../utils/cloudinary");


const register = async (req, res, next) => {
    try {
        const { name, email, password, role, profile, company } = req.body;
        const isUserExist = await User.findOne({ email })
        if (isUserExist) {
            return res.status(400).json({ success: false, message: "Email is already registered" });
        }
        const avatarLocalPath = req.file?.path;
        if (!avatarLocalPath) {
            return res.status(400).json({ message: "Avatar file is required" });
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar) {
            return res.status(500).json({ message: "Failed to upload avatar" });
        }

        const newUser = await User.create({ name, email, password, role, avatar: avatar.url, profile, company })

        const token = await newUser.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // This was the main issue
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Changed from 'Strict'
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.status(201).json({
            success: true,
            message: "Successfully Created",
            token,
            userId: newUser._id.toString(),
        });


    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    console.log(req.body);

    try {
        const { email, password } = req.body;
        const isUserExist = await User.findOne({ email }).select("+password");




        if (!isUserExist) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordValid = await isUserExist.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = await isUserExist.generateToken();

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Dynamic based on environment
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Changed from 'Strict'
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: isUserExist,
            userId: isUserExist._id.toString(), // optional
        });

    } catch (error) {
        next(error);
    }
};

const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
}


const user = async (req, res, next) => {
    try {
        const userData = req.user;
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully.",
            userData
        });

    } catch (error) {
        next(error)
    }
}

module.exports = { register, login, user, logout }