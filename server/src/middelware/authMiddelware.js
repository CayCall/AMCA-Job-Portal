import jwt from 'jsonwebtoken'
import Company from '../models/companyUser.js'


// my protect company is my middleware that acts as a security checkpoint between incoming request and the protected route
// esnures client sending the request has a valid JWT - json web token
//a valid tooken continues to the next function - next()  - > check company routes to see next function
//adds extra layer of security via a token, that is not easy to intercept by third parties
export const protectCompany = async (request, response, next) => {
    //this will look for token inside the header of http request
    //this is the first step of middle layer is identifying if there a token inside header in order to proceed with the request
    const token = request.headers.token;

    if (!token) {
        return response.json({ success: false, message: "Not Authorized, try logging in again." })
    }

    try {
        //validates the token and make sure it is valid using the verify function from jwt module
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        //during this step the decoded tokem above coonnects the decoded token back to my DB
        //the request fetches the company user  by id, and ensures the password hash is never exosed, 
        //also during the process i ensured we specifically do no select password, and MongoDb will exclude it for safety purposes
        request.company = await Company.findById(decoded.id).select('-password')

        next()
    }
    catch (error) {
        response.json({ success: false, message: error.message })
    }
}