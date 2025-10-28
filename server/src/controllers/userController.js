import Job from "../models/JobDataSchema.js";
import jobApplication from "../models/jobApplicationSchema.js";
import User from "../models/userSchema.js";
import app from "../server.js";
import { v2 as cloudinary } from 'cloudinary'
import { getAuth } from '@clerk/express';
import * as streamifier from "streamifier";
import mongoose from "mongoose";
import { response } from "express";

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
        const existing = await jobApplication.findOne({ jobId, userId }).lean();
        if (existing) {
            return response.json({ success: false, message: 'Looks like you’ve already applied for this job!' });
        }

        const jobData = await Job.findById(jobId).lean();
        if (!jobData) return response.status(404).json({ success: false, message: 'Job not found' });
        if (!jobData.companyId) {
            return response.status(422).json({ success: false, message: 'Job missing company' });
        }

        await jobApplication.create({
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
        const { userId } = getAuth(request);
        if (!userId) {
            return response
                .status(401)
                .json({ success: false, message: 'Not authenticated' });
        }

        const appliedJobs = await jobApplication
            .find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec();

        return response.json({ success: true, appliedJobs });
    } catch (error) {
        return response
            .status(500)
            .json({ success: false, message: error.message });
    }

};



//this will be to update the user's current resume
export const updateUserResume = async (request, response) => {

    try {
        const { userId } = getAuth(request);

        if (!userId) return response.status(401).json({ success: false, message: "Please sign in to upload your resume." });

        const file = request.file;
        if (!file) return response.status(400).json({ success: false, message: "No resume uploaded." });

        const user = await User.findById(userId);
        if (!user) return response.status(404).json({ success: false, message: "User not found." });

        const originalName = (request.file.originalname?.trim().replace(/\s+/g, "_")) || "resume.pdf";

        const uploaded = await new Promise((resolve, reject) => {
            const up = cloudinary.uploader.upload_stream(
                { resource_type: "raw", folder: "resumes", use_filename: true, unique_filename: false, filename_override: originalName },
                (err, result) => (err ? reject(err) : resolve(result))
            );
            streamifier.createReadStream(request.file.buffer).pipe(up);
        });

        user.resume = uploaded.secure_url;
        user.resumePublicId = uploaded.public_id;
        await user.save();

        response.json({ success: true, message: "Resume uploaded successfully.", resumeUrl: user.resume });


    } catch (err) {
        console.error("Upload error:", err);
        return response
            .status(500)
            .json({ success: false, message: err.message || "Server error." });
    }
};












