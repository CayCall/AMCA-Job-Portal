import { messageInRaw } from "svix";
import Job from "../models/JobDataSchema.js"

// this will get all the jobs
export const getAllJobs = async (request, response) => {
    try {
        const jobs = await Job.find({ visible: true })
            .populate({ path: 'companyId', select: '-password' })

        response.json({ success: true, jobs })
    }
    catch (error) {
        console.error('Error in getAllJobs:', error);
        response.status(500).json({ success: false, message: error.message });
    }



}


// this will allow us to get a single job by the job's ID
export const getSingleJob = async (request, response) => {
    try {
        const { id } = request.params

        const job = await Job.findById(id)
            .populate({
                path: "companyId",
                select: "-password"
            })

        if (!job) {
            return response.json({
                success: false,
                message: "Job not found"
            })
        }

        response.json({
            success:true,
            job
        })
    }
    catch (error) {
        response.json({
            success:false,
            message: error.message
        })
    }
}

