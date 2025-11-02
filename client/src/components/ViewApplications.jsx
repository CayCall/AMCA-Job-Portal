//recruiter view applications


import React, { useContext, useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { useTranslation } from 'react-i18next';
import Breadcrum from './Breadcrum';
import AppContext from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from './Loader';
import resumeInlineUrl from '../utils/resumeUrl';

const ViewApplications = () => {

  const { t, i18n } = useTranslation();

  const { backendUrl, companyToken, ChangeJobStatus } = useContext(AppContext);
  const [applicants, setApplicants] = useState(null);

  //this will fetch all applications data

  const fetchJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setApplicants(data.applications.reverse())
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) fetchJobApplications();
  }, [companyToken]);


  //this will update the current status of the job application

  const changeStatus = async (id, status) => {

    try {
      const { data } = await axios.post(
        backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )
      if (data.success) {
        fetchJobApplications()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (applicants === null) return <Loader />;

  if (applicants.length === 0) {
    return (
      <div className='flex items-center justify-center h-[70vh]'>
        <p className='text-xl sm:text 2xl'>
          You haven’t received any applications yet.
        </p>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <div >
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm '>
          <thead >
            <tr className='border-b'>
              <th className='py-2 px-4 text-left'>#</th>
              <th className='py-2 px-4 text-left'>{t('User Name')}</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>{t('Job Title')}</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>{t('Location')}</th>
              <th className='py-2 px-4 text-left'>{t('Resume')}</th>
              <th className='py-2 px-4 text-left'>{t('Action')}</th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((application, index) => (
              <tr key={index} className='text-gray-700'>
                <td className='py-2 px-4 border-b text-center'>
                  {index + 1}
                </td>
                <td className='py-2 px-4 border-b text-center flex'>
                  <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={application.userId.image} alt='' />
                  <span >{application.userId.name}</span>
                </td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{application.jobId.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{application.jobId.location}</td>
                <td className='py-2 px-4 border-b'>

                  <a href={application.userId.resume} target='_blank' rel="noreferrer"
                    className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center'
                  >
                    {t('Resume')}<img src={assets.resume_download_icon} alt='' />
                  </a>
                </td>
                <td className='py-2 px-4 border-b relative'>
                  {application.status === "Pending" ? (
                    <div className='relative inline-block text-left group'>
                      <button className='text-gray-500 action-button'>...</button>
                      <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border-gray-200 rounded shadow group-hover:block'>
                        <button
                          onClick={() => changeStatus(application._id, 'Accepted')}
                          className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'
                        >
                          {t('Accept')}
                        </button>
                        <button
                          onClick={() => changeStatus(application._id, 'Rejected')}
                          className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'
                        >
                          {t('Reject')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span
                      className={`font-medium ${application.status === "Accepted"
                        ? "text-green-400"
                        : application.status === "Rejected"
                          ? "text-red-500"
                          : "text-gray-600"
                        }`}
                    >
                      {application.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

}

export default ViewApplications