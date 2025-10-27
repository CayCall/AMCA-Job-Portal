import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Breadcrum from '../components/Breadcrum';
import AppContext from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios'
import toast from 'react-hot-toast';

// marked as favourites section
const FAVS_KEY = 'favs';

//read localstorage for the saved favorites through the key
//parses stored JSON key and ensures it's always arr string
const readFavs = () => {
  try {
    const raw = localStorage.getItem(FAVS_KEY);
    const arr = JSON.parse(raw || '[]');
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return [];
  }
};


const Applications = () => {
  const { user } = useUser()
  const { getToken } = useAuth()
  const [isEdited, setEdit] = useState(false);
  const [resume, setResume] = useState(null);


  const { jobs, backendUrl, userData, userApplicationsData, fetchUserInfo } = useContext(AppContext);

  const { t } = useTranslation();

  const [tab, setTab] = useState('applied');

  const [favs, setFavs] = useState(readFavs());

  //listens for the event and if event is fired then favourite gets set
  useEffect(() => {
    const reload = () => setFavs(readFavs());
    window.addEventListener('favs-change', reload);
    window.addEventListener('storage', reload);
    return () => {
      window.removeEventListener('favs-change', reload);
      window.removeEventListener('storage', reload);
    };
  }, []);


  const favJobs = useMemo(
    () => jobs.filter((j) => favs.includes(String(j?._id))),
    [jobs, favs]
  );

  const removeFav = (id) => {
    const next = favs.filter((x) => x !== String(id));
    localStorage.setItem(FAVS_KEY, JSON.stringify(next));
    setFavs(next);

    window.dispatchEvent(new Event('favs-change'));
  };

  //Resume section
  const updateResume = async () => {
    try {
      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        await fetchUserInfo()
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

    setEdit(false)
    setResume(null)
  }


  return (
    <>
      <NavBar />
      <Breadcrum />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t('Your Applications')}</h2>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setTab('applied')}
              className={`px-3 py-1.5 rounded ${tab === 'applied' ? 'bg-blue-600 text-white' : 'border text-gray-600'
                }`}
            >
              {t('Applied')}
            </button>
            <button
              onClick={() => setTab('favourites')}
              className={`px-3 py-1.5 rounded ${tab === 'favourites' ? 'bg-blue-600 text-white' : 'border text-gray-600'
                }`}
            >
              {t('Favourites')} {favJobs.length ? `(${favJobs.length})` : ''}
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-6 mt-3">
          {isEdited || userData && userData.resume === ""
            ? (
              <>
                <label className="flex items-center" htmlFor="resumeUpload">
                  <p className="bg-blue-100 text-blue-600 px-4 py-2 round-lg mr-2 cursor-pointer">
                    {resume ? resume.name : t('Select Resume')}
                  </p>
                  <input
                    id="resumeUpload"
                    onChange={(e) => setResume(e.target.files[0])}
                    accept="application/pdf"
                    type="file"
                    hidden
                  />
                  <img src={assets.profile_upload_icon} alt="" />
                </label>
                <button
                  onClick={updateResume}
                  className="bg-green-100 border border-green-400 round-lg px-4 py-2"
                  
                >
                  {t('Save')}
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <a className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg" href="">
                  {t('Resume')}
                </a>
                <button
                  onClick={() => setEdit(true)}
                  className="text-gray-500 border border-gray-300 px-4 py-2 rounded-lg"
                >
                  {t('Edit')}
                </button>
              </div>
            )}
        </div>

        {tab === 'applied' ? (
          <>
            <h2 className="text-xl font-semibold mb-4">{t('Job Applied')}</h2>
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b text-left">{t('Company')}</th>
                  <th className="py-3 px-4 border-b text-left">{t('Job Title')}</th>
                  <th className="py-3 px-4 border-b text-left max-sm:hidden">{t('Location')}</th>
                  <th className="py-3 px-4 border-b text-left">{t('Date')}</th>
                  <th className="py-3 px-4 border-b text-left">{t('Status')}</th>
                </tr>
              </thead>
              <tbody>
                {jobsApplied.map((job, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 border-b">
                      <div className="flex items-center gap-2">
                        <img className="w-8 h-8 object-contain" src={job.logo} alt={job.company} />
                        <span className="text-gray-800">{job.company}</span>
                      </div>
                    </td>
                    <td className="px-2 py-4 border-b">{job.title}</td>
                    <td className="px-2 py-4 border-b max-sm:hidden">{job.location}</td>
                    <td className="px-2 py-4 border-b">{moment(job.date).format('ll')}</td>
                    <td className="px-2 py-4 border-b">
                      <span
                        className={`${job.status === 'Accepted'
                          ? 'bg-green-100'
                          : job.status === 'Rejected'
                            ? 'bg-red-100'
                            : 'bg-blue-100'
                          } px-4 py-1.5 rounded `}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">{t('Favourites')}</h2>
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b text-left">{t('Company')}</th>
                  <th className="py-3 px-4 border-b text-left">{t('Job Title')}</th>
                  <th className="py-3 px-4 border-b text-left max-sm:hidden">{t('Location')}</th>
                  <th className="py-3 px-4 border-b text-left">{t('Action')}</th>
                </tr>
              </thead>
              <tbody>
                {favJobs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      {t('No favourites yet. Tap the heart on a job to save it.')}
                    </td>
                  </tr>
                ) : (
                  favJobs.map((job) => (
                    <tr key={job._id}>
                      <td className="py-3 px-4 border-b">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-8 h-8 rounded border object-cover"
                            src={job?.companyId?.image}
                            alt={job?.companyId?.name || 'Company'}
                          />
                          <span className="text-gray-800">{job?.companyId?.name || '—'}</span>
                        </div>
                      </td>
                      <td className="px-2 py-4 border-b">{job.title}</td>
                      <td className="px-2 py-4 border-b max-sm:hidden">{job.location}</td>
                      <td className="px-2 py-4 border-b">
                        <div className="flex gap-2">
                          <Link
                            to={`/apply-job/${job._id}`}
                            className="px-3 py-1 rounded border hover:bg-gray-50"
                          >
                            {t('View')}
                          </Link>
                          <button
                            onClick={() => removeFav(job._id)}
                            className="px-3 py-1 rounded border text-red-600 hover:bg-red-50"
                          >
                            {t('Remove')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Applications;
