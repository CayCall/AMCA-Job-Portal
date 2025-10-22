import express from 'express';
import { applyJob, getAppliedJobs, getUserData, updateUserResume } from '../controllers/userController.js';
import upload from '../config/multer.js';

const router = express.Router()

router.get('/user-data', getUserData)

router.post('/apply', applyJob)

router.get('/applications', getAppliedJobs)

router.post('/update-resume', upload.single('resume'), updateUserResume)


export default router;
