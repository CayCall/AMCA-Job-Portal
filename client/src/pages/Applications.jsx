import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'

const Applications = () => {
  const [isEdited, setEdit] = useState(false)
  const [resume, setResume] = useState(null)
  return (
    <>
      <NavBar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>
          Your Applications
        </h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdited ?
              <>
                <label className='flex items-center' htmlFor="resumeUpload">
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 round-lg mr-2 cursor-pointer'>Select Resume</p>
                  <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                  <img src={assets.profile_upload_icon} alt='' />
                </label>
                <button onClick={() => setEdit(false)} className='bg-green-100 border border-green-400 round-lg px-4 py-2'>Save</button>
              </>
              :
              <div className='flex gap-2'>
                <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href=''>
                  Resume
                </a>
                <button onClick={() => setEdit(true)} className='text-gray-500 border border-gray-300 px-4 py-2 rounded-lg'>
                  Edit
                </button>
              </div>
          }
        </div>
        <h2 className='text-xl font-semibold mb-4'>Job Applied</h2>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left'>Company</th>
              <th className='py-3 px-4 border-b text-left'>Job Title</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => true ? (
              <tr>
                <td className="py-3 px-4 border-b">
                  <div className="flex items-center gap-2">
                    <img className="w-8 h-8 object-contain" src={job.logo} alt={job.company} />
                    <span className="text-gray-800">{job.company}</span>
                  </div>
                </td>
                <td className='px-2 py-4 border-b'>
                  {job.title}
                </td>
                <td className='px-2 py-4 border-b max-sm:hidden'>
                  {job.location}
                </td>
                <td className='px-2 py-4 border-b'>
                  {moment(job.date).format('ll')}
                </td>
                <td className='px-2 py-4 border-b'>
                  <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded `}>
                    {job.status}
                  </span>
                </td>

              </tr>
            ) : (null))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  )
}

export default Applications