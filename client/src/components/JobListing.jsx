import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets';
import JobCard from './JobCard';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 5;
const JobListing = () => {
    const { t, i18n } = useTranslation();
    const { isSearched, searchFilter, setSearchFilter, API_BASE } = useContext(AppContext)
    const [showFilter, setShowFilter] = useState(false);

    //state for search numerous jobs with same string 
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const [currentPage, setPage] = useState(1);

    const [filteredJobs, setFilteredJobs] = useState(jobsData);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // job listings
    const { job, applicantCount } = useState(null);
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');;
    const sourceJobs = jobs.length ? jobs : jobsData;

    //filters sections
    const [catQuery, setCatQuery] = useState("");
    const [locQuery, setLocQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false)

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

                const res = await fetch(`${API_BASE}/api/lang/jobs?lang=${lang}`);

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
            const newLang = evt?.detail || 'en';
            localStorage.setItem('lang', newLang);
            setLang(newLang);
        };
        window.addEventListener('lang-change', onLangChange);

        return () => {
            alive = false;
            window.removeEventListener('lang-change', onLangChange);
        };
    }, [lang]);

    useEffect(() => {
        const norm = (s) => (s ?? "").toString().trim().toLowerCase();

        const allCatsSelected = selectedCategories.length === JobCategories.length;
        const allLocsSelected = selectedLocations.length === JobLocations.length;

        const matchesCategory = (job) => {
            if (!job?.category) return false;
            if (selectedCategories.length === 0 || allCatsSelected) return true;
            return selectedCategories.some((c) => norm(c) === norm(job.category));
        };

        const matchesLocation = (job) => {
            if (!job?.location) return false;
            if (selectedLocations.length === 0 || allLocsSelected) return true;
            return selectedLocations.some((l) => norm(l) === norm(job.location));
        };

        const matchesTitle = (job) =>
            !searchFilter?.title?.trim() || norm(job.title).includes(norm(searchFilter.title));

        const matchesSearchLocation = (job) =>
            !searchFilter?.location?.trim() || norm(job.location).includes(norm(searchFilter.location));

        const newFiltered = (sourceJobs ?? [])
            .slice()
            .reverse()
            .filter((job) => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job));

        setFilteredJobs(newFiltered);
        setPage(1);
    }, [selectedCategories, selectedLocations, searchFilter, sourceJobs]);


    useEffect(() => {

    }, [])
    //don't forget to store the data from the job card into a object that represents the data of the favourite job
    const [userFavourites, setUserFavourites] = useState({});
    return (
        <div className="container 2x2:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-white px-4">
                {isSearched && (searchFilter.title || searchFilter.location) && (
                    <>
                        <h3 className="font-medium text-lg mb-4">{t('Current Search')}</h3>
                        <div className="mb-4 text-gray-600">
                            {searchFilter.title && (
                                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                                    {searchFilter.title}
                                    <img
                                        onClick={() => setSearchFilter((prev) => ({ ...prev, title: '' }))}
                                        className="cursor-pointer"
                                        src={assets.cross_icon}
                                        alt=""
                                    />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className="ml-3 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                                    {searchFilter.location}
                                    <img
                                        onClick={() => setSearchFilter((prev) => ({ ...prev, location: '' }))}
                                        className="cursor-pointer"
                                        src={assets.cross_icon}
                                        alt=""
                                    />
                                </span>
                            )}
                        </div>
                    </>
                )}

                <div>
                    <h3 className="font-medium text-lg py-1">{t('Filters')}</h3>
                    <button
                        className="px-6 py-1.5 rounded border border-gray-400 text-gray-500"
                        onClick={() => setShowFilter((prev) => !prev)}
                    >
                        {showFilter ? t('Close') : t('Show More')}
                    </button>
                    <button
                        onClick={() => {
                            setSearchFilter({ title: '', location: '' });
                            setSelectedCategories([]);
                            setSelectedLocations([]);
                        }}
                        className="mt-5 ml-2.5 text-sm text-blue-600 underline"
                    >
                        {t('Clear filters')}
                    </button>
                </div>


                {/* Category filter */}
                <input
                    type="text"
                    placeholder={t('Search categories...')}
                    className="w-52 px-2 py-1 border rounded text-sm mb-2 mt-2"
                    value={catQuery}
                    onChange={(e) => setCatQuery(e.target.value)}
                />

                <ul className="space-y-4 text-gray-600">
                    {JobCategories.filter(c => c.toLowerCase().includes(catQuery.toLowerCase()))
                        .map((category, index) => (
                            <li key={index} className="flex gap-3 items-center">
                                <input
                                    type="checkbox"
                                    id={`category-${index}`}
                                    value={category}
                                    checked={selectedCategories.includes(category)}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                />
                                <label htmlFor={`category-${index}`}>{category}</label>
                            </li>
                        ))}
                </ul>


                {/* Location filter */}

                <div className={showFilter ? '' : 'lg:hidden'}>
                    <h4 className="font-medium text-lg py-4">{t('Search by Location')}</h4>
                    <input
                        type="text"
                        placeholder={t('Search locations...')}
                        className="w-52 px-2 py-1 border rounded text-sm mb-2 mt-2"
                        value={locQuery}
                        onChange={(e) => setLocQuery(e.target.value)}
                    />
                    <ul className="space-y-4 text-gray-600">
                        {JobLocations
                            .filter(l => l.toLowerCase().includes(locQuery.toLowerCase()))
                            .map((location, index) => (
                                <li key={index} className="flex gap-3 items-center">
                                    <input
                                        type="checkbox"
                                        id={`location-${index}`}
                                        value={location}
                                        checked={selectedLocations.includes(location)}
                                        onChange={(e) => handleLocationChange(e.target.value)}
                                    />
                                    <label htmlFor={`location-${index}`}>{location}</label>
                                </li>
                            ))}
                    </ul>
                </div>


            </div>

            {/* Job listings */}
            <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
                <h3 className="font-medium text-3xl pb-2 pt-3 ml-3" id="job-list">
                    {t('Latest Jobs')}
                </h3>
                <p className="mb-8 ml-3">{t('Get your desired job today')}</p>

                {loading ? (
                    <div className="text-center text-gray-500 m-10">{t('Loading jobs…')}</div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center text-gray-500 m-10">
                        <p className="text-lg font-medium">{t('No results found')}</p>
                        <p className="text-sm">{t('Try adjusting your filters or search terms')}</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                            {filteredJobs
                                .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                                .map((job) => (
                                    <JobCard
                                        key={job._id}
                                        job={{
                                            ...job,
                                            image: job.companyId?.image,
                                        }}
                                    />
                                ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center space-x-2 mt-10">
                            <a href="#job-list">
                                <img
                                    onClick={() => setPage(Math.max(currentPage - 1, 1))}
                                    src={assets.left_arrow_icon}
                                    alt=""
                                />
                            </a>
                            {Array.from({ length: Math.ceil(filteredJobs.length / PAGE_SIZE) }).map((_, index) => (
                                <a key={index} href="#job-list">
                                    <button
                                        onClick={() => setPage(index + 1)}
                                        className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                </a>
                            ))}
                            <a href="#job-list">
                                <img
                                    onClick={() =>
                                        setPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / PAGE_SIZE)))
                                    }
                                    src={assets.right_arrow_icon}
                                    alt=""
                                />
                            </a>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default JobListing;







































































































































































