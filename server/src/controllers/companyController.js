import CompanyUser from "../models/companyUser.js";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";


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
    const company = await CompanyUser.findOne({ email });

    try {
        if (bcrypt.compare(password, company.password)) {
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
    const companyId = request.company._id

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





}

//this will get all the different jobs the recruiter posted
export const retrieveJobsPosted = async (request, response) => {
    try {
        const companyId = request.company._id
        const jobs = await Job.find({ companyId })
        response.json({ success: true, jobsData: jobs })
    }
    catch (error) {
        response.json({ success: false, error: message })
    }
}

//change the status of an applicants job
export const ChangeJobStatus = async (request, response) => {

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








