import express from 'express';
import { ChangeJobStatus, changeJobVisible, companyLogin, companyRegister, getCompanyData, postJob, retrieveJobApplicants, retrieveJobsPosted, retrieveMostApplied, deleteJob } from '../controllers/companyController.js';
import { imageOnly } from '../config/multer.js';
import { protectCompany } from '../middelware/MiddleWareAuth.js'

const router = express.Router();
router.get('/__ping', (req, res) => res.json({ ok: true, scope: 'company' }));
//same order as company controller top to bottom
router.post('/register', imageOnly.single('image'), companyRegister)

router.post('/login', companyLogin)

router.get('/company', protectCompany, getCompanyData)

router.post('/post-job', protectCompany, postJob)

router.get('/applicants', protectCompany, retrieveJobApplicants)

router.get('/list-jobs', protectCompany, retrieveJobsPosted)

router.post('/change-status', protectCompany, ChangeJobStatus)

router.post('/change-visibility', protectCompany, changeJobVisible)


router.get('/most-applied', protectCompany, retrieveMostApplied)

router.delete('/job/:id', protectCompany, deleteJob);

export default router;
