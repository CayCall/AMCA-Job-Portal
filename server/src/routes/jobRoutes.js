import express from 'express'
import { getJobs } from '../controllers/languageController.js';
import { getAllJobs, getSingleJob } from '../controllers/jobcontroller.js'


const router = express.Router()

router.get('/__ping', (req, res) => res.json({ ok: true, scope: 'jobs' }));
router.get("/jobs", getJobs);
//this will a router that we use to get all the job data
router.get('/', getAllJobs)

/// route to get a specficc job and it will use job id
router.get('/:id', getSingleJob)

export default router;
