import express from "express";
import { getJobs, getSingleJob } from "../controllers/languageController.js";

const router = express.Router();

router.get('/__ping', (req, res) => res.json({ ok: true, scope: 'lang' }));
router.get("/jobs", getJobs);
router.get("/jobs/:id", getSingleJob);
export default router;
