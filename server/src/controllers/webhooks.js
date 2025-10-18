import { Webhook } from 'svix';
import User from '../models/user.js'
import { json } from 'express';

// This will be an api controller to Manage Clerk user and the database
// Send message to the server, that allows the user information to get stored in the DB
// data user fills out must be "posted" - uploaded to DB and this must be the POST ENDPOINT
export const clerkwebHook = async (req, res) => {
    try {

        // this makes an instance of a webhook using the clerk webhook secret, which is a key that authenticates that clerk sent the
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        const payload = req.body;

        // Verify all headers from user 

        const evt = webhook.verify(payload, header);


        //Get all the data from the request body
        const { data, type } = evt;


        //Swtich if there is a different event that happens
        switch (type) {
            case 'user.created': {
                const email =
                    data.email_addresses?.[0]?.email_address ||
                    data.primary_email_address_id ||
                    'unknown@example.com';

                const user = {
                    _id: data.id,
                    email,
                    name: `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim(),
                    image: data.image_url || data.profile_image_url || null,
                    resume: '',
                };

                await User.updateOne({ _id: data.id }, { $setOnInsert: user }, { upsert: true });
                res.json({ success: true });
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
                await User.deleteOne({ _id: data.id });
                res.json({})
                break;
            }
            default:
                break;
        }

    }
    catch (error) {
        console.error('Webhook error:', err.name, err.message);
        const status =
            (err?.name || '').toLowerCase().includes('verification') ? 401 : 500;
 return res.status(status).json({ success: false, error: err.message });
    }
}