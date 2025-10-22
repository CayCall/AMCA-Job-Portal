import jwt from 'jsonwebtoken'
import Company from '../models/companyUser.js'

export const protectCompany = async (request,response, next) =>{
    const token = request.headers.token;

    if(!token){
        return response.json({success:false, message:"Not Authorized, try logging in again."})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        request.company = await Company.findById(decoded.id).select('-password')
        
        next()
    }
    catch(error){
        response.json({success:false, message: error.message})
    }
}