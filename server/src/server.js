import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import './config/instrument.js'
import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import { clerkwebHook } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import { clerkMiddleware } from '@clerk/express'
/*
    Server Architecture :
    1. Front-End(Client) - to send requests (http intents(POST,GET)) to the server, e.g user signing up or conmpleting form
    2. Back-End(Server) - talk to db, receive requests, return data
    3. webhooks(third party)- like clerk telling the server to create a user for example.

*/

//this will initilise an express app 
//will allows the app to process http requests, manage certain routes and incorporate middleware("transition layer" - DB, sign ins)
const app = express()


await connectCloudinary();



//MIDDLEWARES
//transition layer (req(), res(), next())- sits between the http request and the response
//Runs after a request comes in but before the server sends a response.
app.use(cors())


//browser will send http request to webhook url, and run clerk webhook function 
app.post('/webhooks', express.raw({ type: 'application/json' }), clerkwebHook)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware())


//ROUTES
/* Routing is most important for the GET and POST intentions aka http requests, with the server.
       we will GET (.get()) from a route to fetch data
       we will POST (.post()) to a route to send data */


// getting the home('/') route to invoke a response that tells us the Server is working
app.get("/", (_req, res) => res.send("Server is up and running."));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/debug-sentry", (_req, _res) => { throw new Error(""); });
app.get("/db-disconnected", (_req, _res) => { throw new Error("Db disconnected!"); });

app.post('/api/company' , companyRoutes)





Sentry.setupExpressErrorHandler(app);

export default app;
