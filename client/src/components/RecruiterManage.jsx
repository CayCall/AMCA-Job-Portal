import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from './Loader';

const RecruiterManage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(false);
  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/company/list-jobs",
        { headers: { token: companyToken } }
      );
      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData)
      } else {
        toast.error(data.message || 'No jobs found');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchJobs();
    }
  }, [companyToken, backendUrl]);

  const changeVisible = async (id, nextValue) => {

    setJobs(prev =>
      prev.map(j => (j._id === id ? { ...j, visible: nextValue } : j))
    );

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-visibility`,
        { id, visible: nextValue },
        { headers: { token: companyToken } }
      );
      if (!data.success) {
        toast.error(data.message || 'Failed to update visibility');
        fetchJobs();
      } else {
        toast.success(data.message || 'Updated');
      }
    } catch (error) {
      toast.error(error.message);
      fetchJobs();
    }
  };

  return jobs ? jobs.length === 0 ? (
    <div className='flex items-center justify-center h-[70vh]'>
      <p className='text-xl sm:text 2xl'>
        You haven’t posted any jobs yet. 
      </p>
    </div>
  ) : (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
              <th className="py-2 px-4 border-b text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  No jobs yet.
                </td>
              </tr>
            ) : (
              jobs.map((job, index) => {
                const dateStr = job.date || job.createdAt;
                const applicantsCount =
                  typeof job.applicants === 'number'
                    ? job.applicants
                    : Array.isArray(job.applicants)
                      ? job.applicants.length
                      : 0;

                return (
                  <tr key={job._id || index} className="text-gray-700">
                    <td className="py-2 px-4 border-b max-sm:hidden">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{job.title}</td>
                    <td className="py-2 px-4 border-b max-sm:hidden">
                      {dateStr ? moment(dateStr).format('ll') : '—'}
                    </td>
                    <td className="py-2 px-4 border-b max-sm:hidden">{job.location}</td>
                    <td className="py-2 px-4 border-b text-center">{applicantsCount}</td>
                    <td className="py-2 px-4 border-b">
                      <input
                        className="scale-125 ml-4"
                        type="checkbox"
                        checked={!!job.visible}
                        onChange={(e) => changeVisible(job._id, e.target.checked)}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate('/dashboard/add-job')}
          className="bg-blue-600 text-white hover:bg-white hover:text-black hover:border hover:border-black transition py-2 px-4 rounded"
        >
          Add New Job
        </button>
      </div>
    </div>
  ) : <Loader />
};

export default RecruiterManage;
