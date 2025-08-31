import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext)
    return (
        <div className='container 2x2:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            {/* This will be for the side bar*/}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* This will be for the Search Filter from the Hero component*/}
                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                            <div className='mb-4 text-gray-600'>
                                {
                                    searchFilter.title && (
                                        <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded '>
                                            {searchFilter.title}
                                            <img onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))} className='cursor-pointer' src={assets.cross_icon} alt='' />
                                        </span>
                                    )}
                                {
                                    searchFilter.location && (
                                        <span className='inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                                            {searchFilter.location}
                                            <img onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))} className='cursor-pointer' src={assets.cross_icon} alt='' />
                                        </span>
                                    )}
                            </div>
                        </>
                    )

                }
                {/* Job Category Filter*/}
                {
                    <div>
                        <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                        <ul className='space-y-4 text-gray-600'>
                            {
                                JobCategories.map((category, index) => (
                                    <li key={index} className='flex gap-3 items-center'>
                                        <input type='checkbox' id={`category-${index}`} name={category} />
                                        <label htmlFor={`category-${index}`}>{category}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
                {/* Location search Filter*/}
                {
                    <div>
                        <h4 className='font-medium text-lg py-4'>Search by Location</h4>
                        <ul className='space-y-4 text-gray-600'>
                            {
                                JobLocations.map((location, index) => (
                                    <li key={index} className='flex gap-3 items-center'>
                                        <input type='checkbox' id={`category-${index}`} name={location} />
                                        <label htmlFor={`category-${index}`}>{location}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }

            </div>
            {/* Job Listings*/}
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl pb-2 pt-3' id='job-list'>Latest Jobs</h3>
                <p className='mb-8'>
                    Get your desired job today
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {jobsData.map((job,index)=>(
                        <JobCard key={index} job={job}/>

                    ))}
                </div>

            </section>
        </div>
    )
}

export default JobListing