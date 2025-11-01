import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { useConfirm } from "./ConfirmModal";

const RecruiterManage = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [openId, setOpenId] = useState(null);
  const { confirm, ConfirmDialog } = useConfirm();
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
  useEffect(() => {
    const onDocClick = (e) => {

      if (!e.target.closest('[data-menu-root]')) setOpenId(null);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);
  const deleteJob = async (id) => {
    const ok = await confirm("Delete job", "This action cannot be undone.");
    if (!ok) return;

    setDeletingId(id);
    const snapshot = jobs;
    setJobs((prev) => prev.filter((j) => j._id !== id));

    try {
      const { data } = await axios.delete(`${backendUrl}/api/company/job/${id}`, {
        headers: { token: companyToken },
      });
      if (!data?.success) throw new Error(data?.message || "Failed to delete job");
      toast.success("Job deleted");
    } catch (err) {
      setJobs(snapshot);
      toast.error(err.message);
    } finally {
      setDeletingId(null);
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
      <div className="overflow-x-auto overflow-y-visible">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
              <th className="py-2 px-4 border-b text-left">Visible</th>
              <th className="py-2 px-4 border-b text-left">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => {
              const dateStr = job.date || job.createdAt;
              const applicantsCount = typeof job.applicants === 'number'
                ? job.applicants
                : Array.isArray(job.applicants) ? job.applicants.length : 0;

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
                  <td className="py-2 px-4 border-b relative">
                    <div data-menu-root className="relative inline-block">
                      <button
                        onClick={() => setOpenId(openId === job._id ? null : job._id)}
                        className="inline-flex h-16 w-8 items-center justify-center rounded hover:bg-gray-100"
                        aria-haspopup="menu"
                        aria-expanded={openId === job._id}
                        title="Actions"
                      >
                        <span className="text-xl leading-none text-gray-600">…</span>
                      </button>

                      <div
                        className={`absolute right-0 top-9 w-36 rounded-lg border border-gray-200 bg-white shadow-md z-100
                  transition transform origin-top-right 
                  ${openId === job._id
                            ? 'opacity-100 scale-100 pointer-events-auto' 
                            : 'opacity-0 scale-95 pointer-events-none'}`}
                        role="menu"
                      >
                        <button
                          onClick={() => {
                            setOpenId(null);
                            deleteJob(job._id);

                          }}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                          role="menuitem"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add New */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate('/dashboard/add-job')}
          className="bg-blue-600 text-white hover:bg-white hover:text-black hover:border hover:border-black transition py-2 px-4 rounded"
        >
          Add New Job
        </button>

      </div>
      {ConfirmDialog}
    </div>
  ) : <Loader />;
};

export default RecruiterManage;


































































