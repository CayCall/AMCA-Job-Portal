import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import './config/instrument.js'
import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import { clerkwebHook } from './controllers/webhooks.js'

/*
    Server Architecture :
    1. Front-End(Client) - to send requests (http intents(POST,GET)) to the server, e.g user signing up or conmpleting form
    2. Back-End(Server) - talk to db, receive requests, return data
    3. webhooks(third party)- like clerk telling the server to create a user for example.

*/

/*
    Server Architecture :
    1. Front-End(Client) - to send requests (http intents(POST,GET)) to the server, e.g user signing up or conmpleting form
    2. Back-End(Server) - talk to db, receive requests, return data
    3. webhooks(third party)- like clerk telling the server to create a user for example.

*/

//this will initilise an express app 
//will allows the app to process http requests, manage certain routes and incorporate middleware("transition layer" - DB, sign ins)
const app = express()


//MONGO DB function to connnect database on mongodb server
connectDB()


//Middleware - transition layer (req(), res(), next())- sits between the http request and the response
//Runs after a request comes in but before the server sends a response.
app.use(cors())


//browser will send http request to webhook url, and run clerk webhook function 
app.post('/webhooks', clerkwebHook)

app.use(express.json())

/* Routing is most important for the GET and POST intentions aka http requests, with the server.
       we will GET (.get()) from a route to fetch data
       we will POST (.post()) to a route to send data */


app.get('/', (req, res) => res.send("Server is up and running.")) // getting the home('/') route to invoke a response that tells us the Server is working
app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error("")
});
app.get('/db-disconnected', function mainHandler(req, res) {
    throw new Error("Db disconnected!")
});


Sentry.setupExpressErrorHandler(app);

export default app;
