import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import NavBar from "../components/NavBar";
import { assets } from "../assets/assets";
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Breadcrum from "../components/Breadcrum";
import axios from "axios";
const ApplyJob = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apply, setApply] = useState(true);

  const { jobs, backendUrl, userData, userApplicationsData } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)

      if (data.success) {
        setJobData(data.job)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchJob()
  }, [id]);

  //simple timer for loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);




  //handles when user applies for a job - check resume, and checks if user is currently logged in
  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Login required - log in to continue with your application.')
      }
      if (!userData.resume) {
        navigate('/applications')
        return toast.error('Resume required - upload resume to continue.')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!jobData) return <p>Job not found</p>;
  const rawDesc = jobData?.description ?? "";
  const translatedDescription = rawDesc
    .replace("t('Job Description')", t("Job Description"))
    .replace("t('Skills Required')", t("Skills Required"))
    .replace("t('Key Responsibilities')", t("Key Responsibilities"));



  return (
    <>
      <NavBar />
      <Breadcrum />
      <div className='min-h-screen flex flex-col py-10 container px-4 2x1:px-20 mx-auto'>
        <div className="bg-white text-black rounded-lg w-full">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">

              <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={jobData.companyId.image} />
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className="text-2xl sm:text-4xl font-medium" >{jobData.title}</h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-10 items-center text-gray-600 mt-5">
                  <span className="flex items-center gap-2">
                    <img src={assets.suitcase_icon} alt="suitcase icon" />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.location_icon} alt="location icon" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.person_icon} alt="icon" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.money_icon} alt="icon" />
                    R{kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button onClick={applyHandler} className="bg-blue-600 p-2.5 px-10 text-white rounded border border-transparent hover:bg-white  hover:border-gray-500 hover:text-gray-500">{t('Apply Now')}</button>
              <p className="mt-1 text-gray-600"> Posted {moment(jobData.date).fromNow()}</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4 ml-3 text-[#2e2e2e]">{t('Job Description')}</h2>
              <section className="rich-text"
                dangerouslySetInnerHTML={{ __html: translatedDescription }}
              >
              </section>
              <button onClick={applyHandler} className="ml-4 bg-blue-600 p-2.5 px-10 text-white rounded mt-10 border border-transparent hover:bg-white  hover:border-gray-500 hover:text-gray-500"> {t('Apply Now')}</button>
            </div>

            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2 className="ml-2">{t('More jobs from ')}{jobData.companyId.name}</h2>
              {
                jobs.filter(job => job.id !== jobData._id && job.companyId._id === jobData.companyId._id).filter(job => true).slice(0, 4)
                  .map((job, index) => <JobCard key={index} job={job} />)
              }
            </div>
          </div>

        </div>

      </div>
      <hr class="border-t border my-4"></hr>
      <Footer />
    </>



  );
};

export default ApplyJob;
