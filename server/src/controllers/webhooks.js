import { Webhook } from 'svix';
import User from '../models/user.js'
import { json } from 'express';
import connectDB from '../config/db.js';
import mongoose from "mongoose";

// This will be an api controller to Manage Clerk user and the database
// Send message to the server, that allows the user information to get stored in the DB
// data user fills out must be "posted" - uploaded to DB and this must be the POST ENDPOINT
export const clerkwebHook = async (req, res) => {
    try {
  

        console.log("[Mongo] connected to:", mongoose.connection.name);
        console.log("[Mongo] host:", mongoose.connection.host);
        const rawBody = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : req.body;

        // Verify all headers from clerk user 
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // this makes an instance of a webhook using the clerk webhook secret, which is a key that authenticates that clerk sent the
        const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET);


        const evt = svix.verify(rawBody, headers);
        const { type, data } = evt || {};
        console.log('Webhook verified:', { type, userId: data?.id });
        //Swtich if there is a different event that happens

        switch (type) {
            case "user.created": {
                const email =
                    data?.email_addresses?.[0]?.email_address ??
                    data?.primary_email_address_id ?? // sometimes Clerk only gives the id
                    "unknown@example.com";

                const userDoc = {
                    _id: data.id,
                    email,
                    name: `${data?.first_name ?? ""} ${data?.last_name ?? ""}`.trim(),
                    image: data?.image_url || data?.profile_image_url || null,
                    resume: "",
                };

                await User.updateOne(
                    { _id: data.id },
                    { $setOnInsert: userDoc },
                    { upsert: true }
                );

                console.log("write ok (created)", userDoc);
                return res.status(200).json({ success: true });
            }

            case "user.updated": {
                const update = {
                    ...(data?.email_addresses?.[0]?.email_address && { email: data.email_addresses[0].email_address }),
                    name: `${data?.first_name ?? ""} ${data?.last_name ?? ""}`.trim(),
                    image: data?.image_url || data?.profile_image_url || null,
                };

                await User.updateOne({ _id: data.id }, { $set: update }, { upsert: true });

                console.log("write ok (updated)", data.id);
                return res.status(200).json({ success: true });
            }

            case "user.deleted": {
                await User.deleteOne({ _id: data.id });
                console.log("write ok (deleted)", data.id);
                return res.status(200).json({ success: true });
            }

            default: {
                console.log("unhandled event type:", type);
                return res.status(200).json({ success: true });
            }
        }
    }
    catch (error) {
        console.error('Webhook error:', error.name, error.message);
        const status = (error?.name || '').toLowerCase().includes('verification') ? 401 : 500;
        return res.status(status).json({ success: false, error: error.message });
    }

}