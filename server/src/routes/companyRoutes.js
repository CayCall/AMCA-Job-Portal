import express from 'express';
import { ChangeJobStatus, changeJobVisible, companyLogin, companyRegister, getCompanyData, postJob, retrieveJobApplicants, retrieveJobsPosted } from '../controllers/companyController.js';
import upload from '../config/multer.js';

const router = express.Router();

//same order as company controller top to bottom
router.post('/register', upload.single('image') ,companyRegister)

router.post('/login', companyLogin)

router.get('/company', getCompanyData)

router.post('/post-job', postJob)

router.get('/applicants', retrieveJobApplicants)

router.get('/list-jobs', retrieveJobsPosted)

router.post('/change-status', ChangeJobStatus)

router.post('change-visibility', changeJobVisible)


export default router;
