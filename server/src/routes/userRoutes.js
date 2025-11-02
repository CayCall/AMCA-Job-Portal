import express from 'express';
import { applyJob, getAppliedJobs, getDataOfUser, updateUserResume } from '../controllers/userController.js';
import { resumeOnly } from '../config/multer.js';

const router = express.Router()

router.get('/__ping', (req, res) => res.json({ ok: true, scope: 'users' }));
router.get('/user', getDataOfUser)

router.post('/apply', applyJob)

router.get('/applications', getAppliedJobs)

router.post('/update-resume', resumeOnly.single('resume'), updateUserResume);


export default router;
