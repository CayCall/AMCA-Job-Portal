import { Webhook } from 'svix';
import User from '../models/user.js'
import { json } from 'express';

// This will be an api controller to Manage Clerk user and the database
// Send message to the server, that allows the user information to get stored in the DB
// data user fills out must be "posted" - uploaded to DB and this must be the POST ENDPOINT
export const clerkwebHook = async (req, res) => {
    try {

        // this makes an instance of a webhook using the clerk webhook secret, which is a key that authenticates that clerk sent the
        const webhoook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
    

        // Verify all headers from user 
        await webhoook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })


        //Get all the data from the request body
        const { data, type } = req.body


        //Swtich if there is a different event that happens
        switch (type) {
            case 'user.created': {
                const user = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(user)
                res.json({})
                break;
            }
            case 'user.updated': {
                const user = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, user)
                res.json({})
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                break;
        }

    }
    catch (error) {
        console.log(error.message)
        res.json({success:false, message: 'Clerk Webhook Error !'})
    }
}