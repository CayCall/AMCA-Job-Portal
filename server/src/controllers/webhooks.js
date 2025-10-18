import { Webhook } from 'svix';
import User from '../models/user.js'
import { json } from 'express';

// This will be an api controller to Manage Clerk user and the database
// Send message to the server, that allows the user information to get stored in the DB
// data user fills out must be "posted" - uploaded to DB and this must be the POST ENDPOINT
export const clerkwebHook = async (req, res) => {
    try {
        console.log('hit /webhooks', {
            isBuffer: Buffer.isBuffer(req.body),
            len: Buffer.isBuffer(req.body) ? req.body.length : null
        });
        // this makes an instance of a webhook using the clerk webhook secret, which is a key that authenticates that clerk sent the
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const payload = req.body;

        // Verify all headers from user 

        const evt = webhook.verify(payload, {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        });
        console.log('verified', { type, id: data?.id });

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
                console.log('write ok', user);
                res.json({ success: true });

            }

            case 'user.updated': {
                const user = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, user)
                console.log('write ok (updated)', data.id);
                res.json({ success: true });

            }
            case 'user.deleted': {
                await User.deleteOne({ _id: data.id });
                console.log('write ok (deleted)', data.id);

                return res.json({ success: true });
            }
            default:
                console.log('unhandled event type:', type);
                return res.json({ success: true });
        }

    }
    catch (error) {
        console.error('Webhook error:', err.name, err.message);
        const status =
            (err?.name || '').toLowerCase().includes('verification') ? 401 : 500;
        return res.status(status).json({ success: false, error: err.message });
    }
}