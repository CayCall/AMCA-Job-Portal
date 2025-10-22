import express from 'express';
import { ChangeJobStatus, changeJobVisible, companyLogin, companyRegister, getCompanyData, postJob, retrieveJobApplicants, retrieveJobsPosted } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middelware/authMiddelware.js'


const router = express.Router();

//Recruiter Architectured routes - FrontEnd initaites request.eg(/post-job) -> Middleware()
router.post('/register', upload.single('image'), companyRegister)

router.post('/login', companyLogin)

router.get('/company', protectCompany, getCompanyData)

router.post('/post-job', protectCompany, postJob)

router.get('/applicants', protectCompany, retrieveJobApplicants)

router.get('/list-jobs', protectCompany, retrieveJobsPosted)

router.post('/change-status', protectCompany, ChangeJobStatus)

router.post('change-visibility', protectCompany, changeJobVisible)


export default router;
