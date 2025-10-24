import Job from "../models/JobDataSchema.js";
import jobApplication from "../models/jobApplicationSchema.js";
import User from "../models/userSchema.js";
import app from "../server.js";
import { v2 as cloudinary } from 'cloudinary'

// this is to get the users data
export const getDataOfUser = async (request, response) => {
    const userId = request.auth.userId;

    try {
        const user = await User.findById(userId)

        if (!user) {
            return response.json({ success: true, message: 'User Was Not Found' })
        }

        response.json({
            success: true,
            user
        })

    } catch (error) {

        response.json({
            success: false,
            message: error.message
        })
    }
}



// function for when a user decides to apply for a job
export const applyJob = async (request, response) => {
    const { jobId } = request.body // request so that we can send jobId data

    const userId = request.auth.userId // clerk middleware authentication

    try {
        const hasApplied = await jobApplication.find({ jobId, userId })

        if (hasApplied.length > 0) {
            return response.json({
                success: false,
                message: 'Already Applied'
            })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return response.json({
                success: false,
                message: 'Job Was Not Found'
            })
        }

        await jobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        response.json({
            success: true,
            message: "Job Applied for Successfully"
        })

    } catch (error) {
        response.json({
            success: false,
            message: error.message
        })
    }
}


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
        const userId = request.auth.userId
        const resumeFile = request.resumeFile
        const userInfo = await User.findById(userId)
        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userInfo.resume = resumeUpload.secure_url
        }
        await userInfo.save()
        return response.json({
            success: true,
            message: 'Resume Updated'
        })
    } catch (error) {
        response.json({
            success:false,
            message: error.message
        })
    }

}