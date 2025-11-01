
import Job from '../models/JobDataSchema.js';
import { gTranslate } from '../utils/translate.js';

const SUPPORTED = new Set(['en', 'af', 'zu', 'st']);

async function translateField(value, target) {
  if (!value) return value;

  return gTranslate(String(value), target, 'en', 'html');
}

async function translateJobDoc(doc, target) {

  const job = doc.toObject ? doc.toObject() : doc;

  job.title = await translateField(job.title, target);
  job.description = await translateField(job.description, target);
  job.category = await translateField(job.category, target);
  job.location = await translateField(job.location, target);
  job.level = await translateField(job.level, target);

  return job;
}

export const getJobs = async (request, response) => {
  try {
    const lang = String(request.query.lang || 'en').toLowerCase();

    const jobs = await Job.find({ visible: true })
      .populate({ path: 'companyId', select: '-password -apiKeys -secrets' });


    if (!SUPPORTED.has(lang) || lang === 'en') {
      return response.json({ success: true, jobs });
    }

    const translated = await Promise.all(jobs.map(j => translateJobDoc(j, lang)));
    return response.json({ success: true, jobs: translated });
  } catch (e) {
    console.error('getJobs error:', e.message);
    return response.status(500).json({ success: false, error: 'server error' });
  }
};



//this translates one single job for the apply page 
export const getSingleJob = async (req, res) => {
  try {
    const lang = String(req.query.lang || 'en').toLowerCase();
    const job = await Job.findById(req.params.id)
      .populate({ path: 'companyId', select: '-password -apiKeys -secrets' });

    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    if (lang === 'en' || !SUPPORTED.has(lang)) {
      return res.json({ success: true, job });
    }

    const translated = await translateJobDoc(job, lang);
    return res.json({ success: true, job: translated });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'server error' });
  }
};







