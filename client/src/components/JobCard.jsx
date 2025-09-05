import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const [bookmarked, setBookmarked] = useState(false);

    const getPreview = (description) => {
        if (!description) return '';
        return description.includes('<!-- more -->')
            ? description.split('<!-- more -->')[0]
            : description.slice(0, 150);
    };

    const navigate = useNavigate()
    return (
        <div className="relative border p-8 m-2 shadow rounded h-[350px] flex flex-col justify-between bg-white">

            {/* Bookmark button - absolute top-right */}
            <button
                onClick={() => setBookmarked(prev => !prev)}
                className="absolute top-10 right-10 text-blue-500 hover:text-blue-800"
                title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
            >
                {bookmarked ? "Favorited by you★" : "Mark As Favorite ☆"}
            </button>

            <div>
                <div className="flex justify-between items-center">
                    <img className="h-8" src={assets[job.companyId.image]} alt="Company Logo" />
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

                <div className="mt-7 min-h-[72px] text-base/7 text-gray-500">
                    <p
                        dangerouslySetInnerHTML={{
                            __html: getPreview(job.description),
                        }}
                    ></p>
                </div>
            </div>

            <div className="mt-4 flex gap-4 text-sm">
                <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className="bg-blue-600 text-white px-4 py-2 rounded border border-transparent hover:bg-white hover:text-black hover:border-gray-500 hover:text-gray-500">
                    Apply Now
                </button>
                <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className="text-gray-500 border border-gray-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default JobCard;
