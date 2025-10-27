import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets';
import JobCard from './JobCard';
import { useTranslation } from 'react-i18next';

const JobListing = () => {
    const { t, i18n } = useTranslation();
    const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext)
    const [showFilter, setShowFilter] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const [currentPage, setPage] = useState(1);

    const [filteredJobs, setFilteredJobs] = useState(jobsData);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const lang = localStorage.getItem('lang') || 'en';
    const sourceJobs = jobs.length ? jobs : jobsData;
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

    useEffect(() => {
        let alive = true; const load = async () => {
            try {
                setLoading(true);
                
                const res = await fetch(`http://localhost:5000/api/jobs?lang=${lang}`);

                const data = await res.json();
                if (!alive) return;
                setJobs(Array.isArray(data?.jobs) ? data.jobs : []);
            } catch (e) {
                if (!alive) return;
                setJobs([]);
                console.error('Failed to load jobs', e);
            } finally {
                if (alive) setLoading(false);
            }
        };

        load();

        const onLangChange = (evt) => {
            load();
        };
        window.addEventListener('lang-change', onLangChange);

        return () => {
            alive = false;
            window.removeEventListener('lang-change', onLangChange);
        };
    }, [lang]);

    useEffect(() => {
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)

        const MatchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

        const newFilteredJobs = sourceJobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && MatchesTitle(job) && matchesSearchLocation(job)
        )

        setFilteredJobs(newFilteredJobs)
        setPage(1)

    }, [
        // jobsData,                      
        selectedCategories,
        selectedLocations,
        searchFilter,
        sourceJobs
    ])

    //don't forget to store the data from the job card into a object that represents the data of the favourite job
    const [userFavourites, setUserFavourites] = useState({});

    return (
        <div className='container 2x2:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            {/* This will be for the side bar*/}

            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* This will be for the Search Filter from the Hero component*/}

                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <>
                            <h3 className='font-medium text-lg mb-4'>{t('Current Search')}</h3>
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
                    <h3 className='font-medium text-lg py-1'>{t('Filters')}</h3>
                    <button className='px-6 py-1.5 rounded border border-gray-400 text-gray-500' onClick={() => setShowFilter(prev => !prev)} > {showFilter ? t("Close") : t("Show More")} </button>
                    <button
                        onClick={() => {
                            setSearchFilter({ title: "", location: "" });
                            setSelectedCategories([]);
                            setSelectedLocations([]);
                        }}
                        className="mt-5 ml-2.5 text-sm text-blue-600 underline"
                    >
                        {t('Clear filters')}
                    </button>
                </div>

                {/* Job Category Filter*/}
                {
                    <div className={showFilter ? "" : "max-lg:hidden"}>
                        <h4 className='font-medium text-lg py-4'>{t('Search by Categories')}</h4>
                        <ul className='space-y-4 text-gray-600'>
                            {
                                JobCategories.map((category, index) => (
                                    <li key={index} className='flex gap-3 items-center '>
                                        <input
                                            type='checkbox'
                                            id={`category-${index}`}
                                            name={category}
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                            className='cursor-pointer'
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
                        <h4 className='font-medium text-lg py-4'>{t('Search by Location')}</h4>
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
                                            className='cursor-pointer'
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
                <h3 className='font-medium text-3xl pb-2 pt-3 ml-3' id='job-list'>{t('Latest Jobs')}</h3>
                <p className='mb-8 ml-3'>{t('Get your desired job today')}</p>

                {

                    loading ? (
                        <div className="text-center text-gray-500 m-10">{t('Loading jobs…')}</div>
                    ) : filteredJobs.length === 0 ? (

                        <div className="text-center text-gray-500 m-10">
                            <p className="text-lg font-medium">{t('No results found')}</p>
                            <p className="text-sm">{t('Try adjusting your filters or search terms')}</p>
                        </div>
                    ) : (
                        <>
                            <div className='grid grid-cols-1= sm:grid-cols-2 xl:grid-cols-1 gap-4'>
                                {filteredJobs
                                    .slice((currentPage - 1) * 5, currentPage * 5)
                                    .map((job, index) => {

                                        const displayJob = {
                                            ...job,
                                            title: job.title_t || job.title,
                                            location: job.location_t || job.location,
                                            description: job.description_t || job.description
                                            
                                        };
                                        return (
                                            <JobCard key={index} job={displayJob} />
                                        );
                                    })}
                            </div>

                            {/* Pagination */}
                            <div className='flex items-center justify-center space-x-2 mt-10'>
                                <a href='#job-list'>
                                    <img
                                        onClick={() => setPage(Math.max(currentPage - 1, 1))}
                                        src={assets.left_arrow_icon}
                                        alt=''
                                    />
                                </a>
                                {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                                    <a key={index} href='#job-list'>
                                        <button
                                            onClick={() => setPage(index + 1)}
                                            className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1
                                                ? 'bg-blue-100 text-blue-500'
                                                : 'text-gray-500'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    </a>
                                ))}
                                <a href='#job-list'>
                                    <img
                                        onClick={() =>
                                            setPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))
                                        }
                                        src={assets.right_arrow_icon}
                                        alt=''
                                    />
                                </a>
                            </div>
                        </>
                    )
                }
            </section>
        </div>
    )
}

export default JobListing