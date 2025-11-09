import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Breadcrum from '../components/Breadcrum';
import AppContext from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FAVS_KEY = 'favs';

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
  const { user } = useUser();
  const { getToken } = useAuth();
  const { t } = useTranslation();

  const [isEdited, setEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const [tab, setTab] = useState('applied');
  const [favs, setFavs] = useState(readFavs());

  const {
    jobs,
    API_BASE,
    userData,
    userApplications,
    fetchUserInfo,
    fetchApplications,
  } = useContext(AppContext);

  const applied = Array.isArray(userApplications)
    ? userApplications
    : Array.isArray(userApplications?.appliedJobs)
      ? userApplications.appliedJobs
      : [];

  // keep favs reactive across tabs/windows
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

  const updateResume = async () => {
    if (!resume) {
      toast.error(t('Please select a PDF first.'));
      return;
    }
    try {
      const fd = new FormData();
      fd.append('resume', resume);
      const token = await getToken();
      const { data } = await axios.post(
        `${API_BASE}/api/users/update-resume`,
        fd,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data?.success) {
        toast.success(t('CV uploaded successfully'));
        await fetchUserInfo();
      } else {
        toast.error(data?.message || t('Upload failed'));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setEdit(false);
      setResume(null);
    }
  };

  // fetch once per user id (prevents stutter from re-firing)
  useEffect(() => {
    if (!user?.id) return;
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const StatusPill = ({ value }) => {
    const v = value ?? t('Pending');
    const cls =
      v === t('Accepted')
        ? 'bg-green-100 text-green-700'
        : v === t('Rejected')
          ? 'bg-red-100 text-red-700'
          : 'bg-blue-100 text-blue-700';
    return <span className={`${cls} px-2.5 py-1 rounded text-xs md:text-sm`}>{v}</span>;
  };

  return (
    <>
      <NavBar />
      <div className="h-16 md:h-[72px]" />
      <Breadcrum />

      <div className="container mx-auto my-6 md:my-10 px-3 sm:px-4 2xl:px-20 min-h-[65vh]">
        {/* Header + Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-semibold">{t('Your Applications')}</h2>

          <div
            role="tablist"
            aria-label={t('Application tabs')}
            className="inline-flex rounded-lg border border-gray-300 overflow-hidden w-full sm:w-auto"
          >
            <button
              role="tab"
              aria-selected={tab === 'applied'}
              onClick={() => setTab('applied')}
              className={`flex-1 px-3 py-2 text-sm transition-all ${tab === 'applied'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
            >
              {t('Applied')}
            </button>
            <button
              role="tab"
              aria-selected={tab === 'favourites'}
              onClick={() => setTab('favourites')}
              className={`flex-1 px-3 py-2 text-sm transition-all ${tab === 'favourites'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
            >
              {t('Favourites')} {favJobs.length ? `(${favJobs.length})` : ''}
            </button>
          </div>
        </div>

        {/* Resume row */}
        <div className="flex flex-wrap items-center gap-2 mb-5 mt-4">
          {isEdited || !userData?.resume ? (
            <>
              <label className="flex items-center cursor-pointer" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-lg mr-2 truncate max-w-[60vw] sm:max-w-none">
                  {resume ? resume.name : t('Select CV')}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img className="w-5 h-5" src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={updateResume}
                className="cursor-pointer bg-green-100 text-green-800 border border-green-400 rounded-lg px-3 sm:px-4 py-2 disabled:opacity-50"
                disabled={!resume}
              >
                {t('Save')}
              </button>
            </>
          ) : (
            <div className="flex flex-wrap gap-2">
              <a
                href={userData.resume}
                className="border border-solid border-gray-300 cursor-pointer bg-blue-50 text-gray-700 px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-1 transition-all duration-300 group hover:bg-blue-600 hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                <span className="transition-all duration-300 group-hover:-translate-x-1">
                  {t('View my CV')}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <button
                onClick={() => setEdit(true)}
                className="text-gray-700 border border-gray-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
              >
                {t('Edit')}
              </button>
            </div>
          )}
        </div>

        {/* ===== Applied Tab ===== */}
        {tab === 'applied' ? (
          <>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">{t('Job Applied')}</h2>

            {/* Mobile cards */}
            <ul className="md:hidden space-y-3" style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
              {applied.length ? (
                applied.map((app, i) => (
                  <li key={app?._id ?? i} className="rounded-lg border bg-white p-3 flex gap-3">
                    <img
                      className="w-10 h-10 object-contain rounded border"
                      src={app?.companyId?.image}
                      alt={app?.companyId?.name || 'Company'}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium truncate">{app?.jobId?.title || '—'}</p>
                        <StatusPill value={app?.status} />
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {app?.companyId?.name || '—'}
                      </p>
                      <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-x-2 gap-y-0.5">
                        <span>{app?.jobId?.location || '—'}</span>
                        <span>•</span>
                        <span>{moment(app?.date ?? Date.now()).format('ll')}</span>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500 py-8 border rounded-lg">
                  {t('No applications found.')}
                </li>
              )}
            </ul>

            {/* Desktop table */}
            <div className="hidden md:block" style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
              <div className="overflow-x-auto rounded-lg border bg-white">
                <table className="min-w-[720px] w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">{t('Company')}</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">{t('Job Title')}</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">{t('Location')}</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">{t('Date')}</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">{t('Status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applied.length ? (
                      applied.map((app, index) => (
                        <tr key={app?._id ?? index} className="border-t">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <img
                                className="w-8 h-8 object-contain"
                                src={app?.companyId?.image}
                                alt={app?.companyId?.name || 'Company'}
                                loading="lazy"
                                decoding="async"
                              />
                              <span className="text-gray-800">{app?.companyId?.name || '—'}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{app?.jobId?.title || '—'}</td>
                          <td className="py-3 px-4">{app?.jobId?.location || '—'}</td>
                          <td className="py-3 px-4">{moment(app?.date ?? Date.now()).format('ll')}</td>
                          <td className="py-3 px-4">
                            <StatusPill value={app?.status} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          {t('No applications found.')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* ===== Favourites Tab ===== */
          <>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">{t('Favourites')}</h2>

            {/* Mobile cards */}
            <ul className="md:hidden space-y-3" style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
              {favJobs.length ? (
                favJobs.map((job) => (
                  <li key={job._id} className="rounded-lg border bg-white p-3">
                    <div className="flex gap-3">
                      <img
                        className="w-10 h-10 rounded border object-cover"
                        src={job?.companyId?.image}
                        alt={job?.companyId?.name || 'Company'}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{job.title}</p>
                        <p className="text-sm text-gray-600 truncate">{job?.companyId?.name || '—'}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{job.location}</p>

                        <div className="mt-2 flex gap-2">
                          <Link
                            to={`/apply-job/${job._id}`}
                            className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
                          >
                            {t('View')}
                          </Link>
                          <button
                            onClick={() => removeFav(job._id)}
                            className="px-3 py-1.5 rounded border text-sm text-red-600 hover:bg-red-50"
                          >
                            {t('Remove')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500 py-8 border rounded-lg">
                  {t('No favourites yet. Tap the heart on a job to save it.')}
                </li>
              )}
            </ul>

            {/* Desktop table */}
            <div className="hidden md:block" style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
              <div className="overflow-x-auto rounded-lg border bg-white">
                <table className="min-w-[720px] w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">{t('Company')}</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">{t('Job Title')}</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">{t('Location')}</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">{t('Action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favJobs.length ? (
                      favJobs.map((job) => (
                        <tr key={job._id} className="border-t">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <img
                                className="w-8 h-8 rounded border object-cover"
                                src={job?.companyId?.image}
                                alt={job?.companyId?.name || 'Company'}
                                loading="lazy"
                                decoding="async"
                              />
                              <span className="text-gray-800">{job?.companyId?.name || '—'}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{job.title}</td>
                          <td className="py-3 px-4">{job.location}</td>
                          <td className="py-3 px-4">
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
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500">
                          {t('No favourites yet. Tap the heart on a job to save it.')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Applications;
