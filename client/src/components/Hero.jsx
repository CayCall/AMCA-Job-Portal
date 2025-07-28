import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import AppContext from '../context/AppContext'
import AppContextProvider from '../context/AppContextProvider';

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext);

    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSearch = () => {
        setSearchFilter({
            title:titleRef.current.value,
            location:locationRef.current.value
        })
        setIsSearched(true)

    }
    return (
        <div className='container 2x1:px-20 mx-auto my-10'>
            <div className='bg-gradient-to-r from-slate-400 to-black text-white py-16 text-center mx-2 rounded-xl '>
                <h2 className='text-2xl md:text-2xl lg:text-4xl font-medium mb-4'>
                    Over 1 000+ Domestic jobs available
                </h2>
                <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5 leading-relaxed'>
                    Meeting people where they are, not just where we wish they were.
                </p>
                <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
                    <div className='flex items-center'>
                        <img className='h-4 sm:h-5' src={assets.search_icon} alt='' />
                        <input
                            type='text'
                            placeholder='Search For Jobs'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            ref={titleRef}
                        />
                    </div>
                    <div className='flex items-center'>
                        <img className='h-4 sm:h-5' src={assets.location_icon} alt='' />
                        <input
                            type='text'
                            placeholder='Location'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            ref={locationRef}
                        />
                    </div>
                    <button onClick={onSearch} className='bg-blue-600 px-6 py-2 rounded text-white m-1'>
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero