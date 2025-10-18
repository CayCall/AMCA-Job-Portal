import CompanyUser from "../models/companyUser.js";
import bcrypt from 'bcrypt';

//this will be when a user registers a new company - a new recruiter
export const companyRegister = async (request,response) =>{
    const {name, email, password} = request.body;

    const imageFile = request.file;

    if(!name || !email || !password || !imageFile){
        return response.json({success:false, message:"Missing Details"})
    }

    try {
        const companyExist = await CompanyUser.findOne({email})

        if(companyExist){
            return response.json({success:false, message:'Company has already been registered.'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
    } catch (error) {
        
    }


}

// when a user logins as recruiter
export const companyLogin = async (request,response) =>{

}

//this will get the companies information for us
export const getCompanyData = async (request,response) =>{

}

//when a recruiter decides to post a new job to the portal
export const postJob = async (request,response) =>{

}

//this will get all the different applicants that applied for jobs
export const retrieveJobApplicants = async (request,response) =>{

}

//this will get all the different jobs the recruiter posted
export const  retrieveJobsPosted = async (request,response) =>{

}

//change the status of an applicants job
export const  ChangeJobStatus = async (request,response) =>{

}

//for a recruiter to show or not show a job
export const  changeJobVisible = async (request,response) =>{

}








