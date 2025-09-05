import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext)
    const [showFilter, setShowFilter] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const [currentPage, setPage] = useState(1)


    const [filteredJobs, setFilteredJobs] = useState(jobsData)

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }
    const handleLocationChange = (location) => {
        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }

    useEffect (()=>{
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)
        
        const MatchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        
        const matchesSearchLocation = job =>  searchFilter.location  === ""  || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());
        
        const newFilteredJobs = jobsData.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && MatchesTitle(job) && matchesSearchLocation(job)
        )
        
        setFilteredJobs(newFilteredJobs)
        setPage(1)

    }, [jobsData,selectedCategories,selectedLocations,searchFilter])
    //store the data from the job card into a object that represents the data of the favourite job
    const [userFavourites, setUserFavourites] = useState({});

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
                                        <span className='ml-3 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                                            {searchFilter.location}
                                            <img onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))} className='cursor-pointer' src={assets.cross_icon} alt='' />
                                        </span>
                                    )}
                            </div>
                        </>
                    )

                }
                <div>
                    <h3 className='font-medium text-lg py-1'>Filters</h3>
                    <button className='px-6 py-1.5 rounded border border-gray-400 text-gray-500' onClick={() => setShowFilter(prev => !prev)} > {showFilter ? "Close" : "Show More"} </button>
                    <button
                        onClick={() => {
                            setSearchFilter({ title: "", location: "" });
                            setSelectedCategories([]);
                            setSelectedLocations([]);
                        }}
                        className="mt-5 ml-2.5 text-sm text-blue-600 underline"
                    >
                        Clear filters
                    </button>
                </div>

                {/* Job Category Filter*/}
                {
                    <div className={showFilter ? "" : "max-lg:hidden"}>
                        <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                        <ul className='space-y-4 text -gray-600'>
                            {
                                JobCategories.map((category, index) => (
                                    <li key={index} className='flex gap-3 items-center'>
                                        <input
                                            type='checkbox'
                                            id={`category-${index}`}
                                            name={category}
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        <label htmlFor={`category-${index}`}>{category}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
                {/* Location search Filter*/}
                {
                    <div className={showFilter ? "" : "lg:hidden"}>
                        <h4 className='font-medium text-lg py-4'>Search by Location</h4>
                        <ul className='space-y-4 text-gray-600'>
                            {
                                JobLocations.map((location, index) => (
                                    <li key={index} className='flex gap-3 items-center'>
                                        <input
                                            type='checkbox'
                                            id={`category-${index}`}
                                            name={location}
                                            checked={selectedLocations.includes(location)}
                                            onChange={() => handleLocationChange(location)}
                                        />
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
                <h3 className='font-medium text-3xl pb-2 pt-3 ml-3' id='job-list'>Latest Jobs</h3>
                <p className='mb-8 ml-3'>
                    Get your desired job today
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4'>
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />

                    ))}
                </div>

                {/* Pages*/}
                {
                    filteredJobs.length > 0 && (
                        <div className='flex items-center justify-center space-x-2 mt-10 '>
                            <a href='#job-list'>
                                <img onClick={() => setPage(Math.max(currentPage - 1), 1)} src={assets.left_arrow_icon} alt='' />
                            </a>
                            {
                                Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                                    <a href='#job-list' key={index}>
                                        <button onClick={() => setPage(index + 1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>{index + 1}</button>
                                    </a>
                                ))
                            }
                            <a href='#job-list'>
                                <img onClick={() => setPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt='' />
                            </a>
                        </div>
                    )
                }





            </section>

        </div>
    )
}

export default JobListing