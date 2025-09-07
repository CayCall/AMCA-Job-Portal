import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import NavBar from "../components/NavBar";
import { assets } from "../assets/assets";
import kconvert from 'k-convert';
import moment from 'moment';

const ApplyJob = () => {
  const { id } = useParams();
  const { jobs } = useContext(AppContext);

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (jobs.length > 0) {
      const foundJob = jobs.find((job) => String(job._id) === String(id));
      if (foundJob) {
        setJobData(foundJob);
      }
    }
  }, [id, jobs]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }


  if (!jobData) return <p>Job not found</p>;


  return (
    <>
      <NavBar />
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
              <button className="bg-blue-600 p-2.5 px-10 text-white rounded border border-transparent hover:bg-white hover:text-black hover:border-gray-500 hover:text-gray-500"> Apply Now</button>
              <p className="mt-1 text-gray-600"> Posted {moment(jobData.date).fromNow()}</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job Description</h2>
              <section className="rich-text" dangerouslySetInnerHTML={{__html:jobData.description}}>
              </section>
              <button className="bg-blue-600 p-2.5 px-10 text-white rounded mt-10 border border-transparent hover:bg-white hover:text-black hover:border-gray-500 hover:text-gray-500"> Apply Now</button>
            </div>
          </div>

        </div>
      </div>

    </>



  );
};

export default ApplyJob;
