import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import './config/instrument.js'
import "../src/config/instrument.js";
import * as Sentry from "@sentry/node";
import { clerkwebHook } from './routes/webhooks.js'

//this will initilise an express app 
//will allows the app to process http requests, manage certain routes and incorporate middleware("transition layer" - DB, sign ins)

const app = express()


//MONGO DB CONN
connectDB()

//Middleware - transition layer (req(), res(), next())- sits between the request and the response
//Runs after a request comes in but before the server sends a response.
app.use(cors())
app.use(express.json())


//Route
app.get('/', (req, res) => res.send("Working."))
app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error("")
});
app.get('/db-disconnected', function mainHandler(req, res) {
    throw new Error("Db disconnected!")
});
app.post('/webhooks', clerkwebHook)
//Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

