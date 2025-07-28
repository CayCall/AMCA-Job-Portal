import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { assets } from '../assets/assets';

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);
    console.log("🎯 JobListing Rendered")
    console.log({ isSearched, searchFilter })
    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
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

            </div>
        </div>
    )
}

export default JobListing