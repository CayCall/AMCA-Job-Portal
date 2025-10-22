import express from 'express';
import { ChangeJobStatus, changeJobVisible, companyLogin, companyRegister, getCompanyData, postJob, retrieveJobApplicants, retrieveJobsPosted } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import {protectCompany} from '../middelware/MiddleWareAuth.js'

const router = express.Router();

//same order as company controller top to bottom
router.post('/register', upload.single('image') ,companyRegister)

router.post('/login', companyLogin)

router.get('/company', protectCompany, getCompanyData)

router.post('/post-job',protectCompany, postJob)

router.get('/applicants', protectCompany, retrieveJobApplicants)

router.get('/list-jobs', protectCompany, retrieveJobsPosted)

router.post('/change-status', protectCompany, ChangeJobStatus)

router.post('/change-visibility',protectCompany , changeJobVisible)


export default router;
