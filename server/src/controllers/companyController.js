import CompanyUser from "../models/companySchema.js";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from "../models/JobDataSchema.js";
import jobApplication from "../models/jobApplicationSchema.js";
import { application, response } from "express";

//this will be when a user registers a new company - a new recruiter
export const companyRegister = async (request, response) => {
    const { name, email, password } = request.body;

    const imageFile = request.file;
    console.log('Incoming file:', request.file);
    console.log('Incoming body:', request.body);
    if (!name || !email || !password || !imageFile) {
        return response.json({ success: false, message: "Missing Details" })
    }

    try {
        const existing = await CompanyUser.findOne({ email });
        if (existing) {
            return response
                .status(409)
                .json({ success: false, message: "Company already registered" });
        }

        const hash = await bcrypt.hash(password, 10);

        const uploaded = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "companies" },
                (err, result) => (err ? reject(err) : resolve(result))
            );
            stream.end(imageFile.buffer);
        });

        const companyUser = await CompanyUser.create({
            name,
            email,
            password: hash,
            image: uploaded.secure_url,
        });


        return response.status(201).json({
            success: true,
            companyUser: {
                _id: companyUser._id,
                name: companyUser.name,
                email: companyUser.email,
                image: companyUser.image,
            },
            token: generateToken(companyUser._id),
        });
    } catch (error) {
        console.error("register error:", error);
        return response.status(500).json({ success: false, message: error.message });
    }


}

// when a user logins as recruiter
export const companyLogin = async (request, response) => {
    const { email, password } = request.body;



    try {
        const company = await CompanyUser.findOne({ email });
        if (await bcrypt.compare(password, company.password)) {
            response.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        }
        else {
            response.json({
                success: false, message: "Invalid email or password."
            })
        }
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//this will get the companies information for us
export const getCompanyData = async (request, response) => {

    try {
        const company = request.company
        response.json({ success: true, company })
    } catch (error) {
        response.json({ success: false, error: message })
    }
}

//when a recruiter decides to post a new job to the portal
export const postJob = async (request, response) => {
    const { title, description, location, salary, level, category } = request.body;

    const companyId = request.company._id;

    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })
        await newJob.save()

        response.json({ success: true, newJob })
    }
    catch (error) {
        response.json({ success: false, message: error.message })
    }
}

//this will get all the different applicants that applied for jobs
export const retrieveJobApplicants = async (request, response) => {
    try {

        const companyId = request.company._id;

        const applications = await jobApplication.find({ companyId })
            .populate('userId', 'name image resume')
            .populate('jobId', 'title location category level salary')
            .exec()

        return response.json({ success: true, applications })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
}

//this will get all the different jobs the recruiter posted
export const retrieveJobsPosted = async (request, response) => {
    try {
        const companyId = request.company._id;
        const jobs = await Job.find({ companyId: request.company._id }).lean();

        const jobsData = await Promise.all(
            jobs.map(async (job) => {
                const applicants = await jobApplication.countDocuments({ jobId: job._id });
                return { ...job, applicants };
            })
        );

        response.json({ success: true, jobsData })

    }
    catch (error) {
        response.json({ success: false, error: error.message })
    }

}


// retrieve top 3 most applied for jobs

export const retrieveMostApplied = async (request, response) => {
    //get all 

    try {
        const companyId = request.company._id;
        // using lean function as i will just be displaying data on the client, no modifications needed and offers great performance optimisation
        const jobs = await Job.find({ companyId }).lean();

        const jobData = await Promise.all(
            jobs.map(async (job) => {
                const applicants = await jobApplication.countDocuments({ jobId: job._id });
                return { ...job, applicants };
            })
        );

        if (jobData.length > 0) {
            return response.json({
                success: true,
                message: "Jobs retrieved successfully.",
                jobs: jobData,
            });
        } else {
            return response.json({
                success: false,
                message: "No jobs or applications found.",
                jobs: [],
            });
        }

    } catch (error) {
        console.error("Error retrieving most applied jobs:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while retrieving job data.",
            error: error.message,
        });
    }

}

//change the status of an applicants job
export const ChangeJobStatus = async (request, response) => {

    try {
        const { id, status } = request.body;

        await jobApplication.findOneAndUpdate({ _id: id }, { status })

        response.json({ success: true, message: 'Status Changed' })

    } catch (error) {
        response.json({ success: false, message: error.message })
    }



}

//for a recruiter to show or not show a job
export const changeJobVisible = async (request, response) => {
    try {
        const { id } = request.body;

        const companyId = request.company._id

        const job = await Job.findById(id)

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible
        }

        await job.save()
        response.json({ success: true, job })

    } catch (error) {
        response.json({ success: false, message: error.message })
    }
}


export const deleteJob = async (request, response) => {
    try {
        const { id } = request.params;
        const companyId = request.company._id

        const deleted = await Job.findOneAndDelete({ _id: id, companyId });
        if (!deleted) return response.json({ success: false, message: 'Job not found' });


        // await Application.deleteMany({ jobId: id });

        return response.json({ success: true, message: 'Job deleted' });
    } catch (e) {
        return response.json({ success: false, message: e.message });
    }
};





