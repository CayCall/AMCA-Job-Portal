import { messageInRaw } from "svix";
import Job from "../models/JobDataSchema.js"

// this will get all the jobs
export const getAllJobs = async (request, response) => {
    try {
        const jobs = await Job.find({ visible: true })
            .populate({ path: 'companyId', select: '-password', })

        response.json({ success: true, jobs })
    }
    catch (error) {
        console.error('Error in getAllJobs:', error);
        response.status(500).json({ success: false, message: error.message });
    }



}


// this will allow us to get a single job by the job's ID
export const getSingleJob = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id)
            .populate({ path: 'companyId', select: 'name image email' })
            .lean();

        if (!job) {
            return res.json({ success: false, message: 'Job not found' });
        }

        return res.json({ success: true, job });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};


































