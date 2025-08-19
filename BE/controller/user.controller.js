const JobModel = require("../model/job.model");
const User = require("../model/user.model");
const uploadOnCloudinary = require("../utils/cloudinary");

const getAllUser = async (req, res, next) => {
    try {
        const response = await User.find({})
        return res.status(200).json({
            success: true,
            message: "Fetched Successfully",
            users: response
        });
    } catch (error) {
        next(error)
    }
}


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

const updateUserDetails = async (req, res, next) => {
    console.log("is this body", req.body);

    try {
        const id = req.userId;
        const updatedUserData = req.body;

        const updatedData = await User.findByIdAndUpdate(id, updatedUserData, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully.",
            updatedData: updatedData,
        });
    } catch (error) {
        next(error);
    }
};



const updateAvatar = async (req, res, next) => {
    try {
        const { id } = req.params;

        const avatarLocalPath = req.file?.path;
        if (!avatarLocalPath) {
            return res.status(400).json({ message: "Avatar file is required" });
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar) {
            return res.status(500).json({ message: "Failed to upload avatar" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { avatar: avatar.url },
            { new: true }
        ).select("-password"); 

        return res.json({
            success: true,
            message: "Profile photo updated",
            user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};




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
const getMySavedJobs = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId)
            .populate("savedJobs")
            .sort({ createdAt: -1 });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            message: "My saved jobs fetched successfully",
            savedJobs: user.savedJobs,
        });
    } catch (error) {
        next(error);
    }
};

const saveJob = async (req, res, next) => {
    try {
        const { jobId } = req.body;
        const userId = req.user.id;


        const job = await JobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.savedJobs.includes(jobId)) {
            return res.status(400).json({ success: false, message: "You already saved this job" });
        }


        user.savedJobs.push(jobId);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Job saved successfully",
            savedJobs: user.savedJobs,
        });
    } catch (error) {
        next(error);
    }
};




module.exports = { register, login, user, logout, getAllUser, getMySavedJobs, saveJob, updateUserDetails, updateAvatar };