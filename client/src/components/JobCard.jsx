import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
const writeFavs = (ids) => {
  try {
    localStorage.setItem(FAVS_KEY, JSON.stringify(ids.map(String)));
  } catch { }
};
const toPreview = (html, limit = 220) => {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, '').trim();
  if (text.length <= limit) return text;
  return text.slice(0, limit).replace(/\s+\S*$/, '') + '...';
};

const JobCard = ({ job }) => {
  const { t } = useTranslation();
  const [bookmarked, setBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const favs = readFavs();
    setBookmarked(favs.includes(String(job?._id)));
  }, [job?._id]);


  const toggleBookmark = () => {
    const favs = readFavs();
    const id = String(job?._id);
    const next = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
    writeFavs(next);
    setBookmarked(next.includes(id));
  };

  return (
    <div className="relative border p-9 m-2 shadow rounded flex flex-col justify-between bg-white h-[400px] sm:h-[550px] md:h-[430px] lg:h-[420px]">
      {/* Bookmark button */}
      <button
        onClick={toggleBookmark}
        className="absolute top-10 right-10 text-blue-500 hover:text-blue-800"
        title={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      >
        {bookmarked ? t('Favorited by you★') : t('Mark As Favorite ☆')}
      </button>

      <div>
        <div className="flex justify-between items-center">
          <img
            className="h-8"
            src={job.companyId.image}
            alt={job?.companyId?.name || 'Company Logo'}
          />
        </div>

        <h4 className="font-medium text-xl mt-2">{job.title}</h4>

        <div className="flex items-center gap-3 mt-2 text-xs">
          <span className="bg-blue-50 border-blue-200 px-4 py-1.5 rounded">
            {job.location}
          </span>
          <span className="bg-red-50 border-red-200 px-4 py-1.5 rounded">
            {job.level}
          </span>
        </div>

        <div className="mt-6 min-h-[7px] ">
          <p className="text-base/7 text-gray-500">
            {toPreview(job.description, 175)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-4 text-sm">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded border border-transparent hover:bg-white hover:text-black hover:border-gray-500 hover:text-gray-500"
        >
          {t('Apply Now')}
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="text-gray-500 border border-gray-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
        >
          {t('Learn More')}
        </button>
      </div>
    </div>
  );
};

export default JobCard;