import Job from "../models/JobDataSchema.js";
import jobApplication from "../models/jobApplicationSchema.js";
import User from "../models/userSchema.js";
import app from "../server.js";
import { v2 as cloudinary } from 'cloudinary'
import { getAuth } from '@clerk/express';
import * as streamifier from "streamifier";

// this is to get the users data
export const getDataOfUser = async (request, response) => {

    const { userId } = getAuth(request);
    if (!userId) return response.status(401).json({ success: false, message: 'Not authenticated' });

    try {
        const user = await User.findById(userId).lean().catch(() => null);
        return response.json({ success: true, user: user || { userId } });
    } catch (err) {
        return response.status(500).json({ success: false, message: err.message });
    }

};





// function for when a user decides to apply for a job
export const applyJob = async (request, response) => {
    const jobId = request.body?.jobId;
    const { userId } = getAuth(request);

    if (!userId) return response.status(401).json({ success: false, message: 'Not authenticated' });
    if (!jobId || !mongoose.isValidObjectId(jobId)) {
        return response.status(400).json({ success: false, message: 'Invalid job id' });
    }

    try {
        const existing = await JobApplication.findOne({ jobId, userId }).lean();
        if (existing) return response.status(409).json({ success: false, message: 'Already applied' });

        const jobData = await Job.findById(jobId).lean();
        if (!jobData) return response.status(404).json({ success: false, message: 'Job not found' });
        if (!jobData.companyId) {
            return response.status(422).json({ success: false, message: 'Job missing company' });
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            status: 'Pending',
            date: Date.now(),
        });

        return response.json({ success: true, message: 'Application submitted' });
    } catch (err) {
        if (err?.code === 11000) {
            return response.status(409).json({ success: false, message: 'Already applied' });
        }
        return response.status(500).json({ success: false, message: err.message });
    }
};




//Get data of the jobs user has already applied for 
export const getAppliedJobs = async (request, response) => {
    try {
        const userId = request.auth.userId

        const appliedJobs = await jobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!appliedJobs) {
            response.json({
                success: false,
                message: "no applications found."
            })
        }

        response.json({
            success: true,
            appliedJobs
        })

    } catch (error) {

        response.json({
            success: false,
            message: error.message
        })
    }
}

//this will be to update the user's current resume
export const updateUserResume = async (request, response) => {

    try {
        const { userId } = getAuth(request);
        console.log("User ID:", userId);
        console.log("File received:", request.file?.originalname, request.file?.mimetype);

        if (!userId) return response.status(401).json({ success: false, message: "Please sign in to upload your resume." });

        const file = request.file;
        if (!file) return response.status(400).json({ success: false, message: "No resume uploaded." });

        const user = await User.findOne({ clerkId: userId }); // change to match your schema
        if (!user) return response.status(404).json({ success: false, message: "User not found." });

        const uploadToCloudinary = () =>
            new Promise((resolve, reject) => {
                const upload = cloudinary.uploader.upload_stream(
                    { resource_type: "raw", folder: "resumes" },
                    (err, result) => (err ? reject(err) : resolve(result))
                );
                streamifier.createReadStream(file.buffer).pipe(upload);
            });

        const uploaded = await uploadToCloudinary();
        user.resume = uploaded.secure_url;
        await user.save();

        return response.json({ success: true, message: "Resume updated." });
    } catch (err) {
        console.error("Upload error:", err);
        return response.status(500).json({ success: false, message: err.message || "Upload failed." });
    }

}