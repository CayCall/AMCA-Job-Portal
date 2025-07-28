import React, { useState, useRef } from 'react'
import { assets } from "../assets/assets"
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { ChevronDown } from "lucide-react";

const NavBar = () => {
    const { openSignIn } = useClerk();
    const { user } = useUser();

    // drop down
    const [dropdown, setDropDown] = useState(false);
    const timeoutRef = useRef(null);
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setDropDown(true);
    };

    const handleMouseLeave = () => {

        timeoutRef.current = setTimeout(() => {
            setDropDown(false);
        }, 300);
    };

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-12 mx-auto flex justify-between items-center'>

                {/* Logo */}
                <Link to={'/'}>
                    <img src={assets.logo} alt='Site Logo' />
                </Link>

                {/* Right Side Nav (login/user + language button) */}
                <div className='flex items-center gap-6'>

                    {/* Login or User Info */}
                    {
                        user ? (
                            <div className='flex items-center gap-3'>
                                <Link to={'/applications'}>Applied Jobs</Link>
                                <p>|</p>
                                <p>Hi, {user.firstName + " " + user.lastName}</p>
                                <UserButton />
                            </div>
                        ) : (
                            <div className='flex items-center gap-4 max-sm:text-xs'>
                                <button className='text-gray-600'>Recruiter Login</button>
                                <button
                                    onClick={() => openSignIn()}
                                    className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>
                                    Login
                                </button>
                            </div>
                        )
                    }


                    <div
                        className="relative inline-block"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            className="flex items-center gap-1 text-sm border border-black rounded-full px-4 py-2 bg-white text-black hover:bg-blue-600 hover:text-white hover:border-black transition-colors duration-200 ease-in-out"
                            aria-haspopup="listbox"
                            aria-expanded={dropdown ? "true" : "false"}
                        >
                            Language
                            <ChevronDown size={16} className="text-inherit" />
                        </button>

                        {dropdown && (
                            <div className="absolute top-full mt-2 right-0 bg-white border rounded shadow p-3 text-sm z-10 min-w-[120px]">
                                <p className="hover:bg-gray-100 p-2 rounded cursor-pointer">English</p>
                                <p className="hover:bg-gray-100 p-2 rounded cursor-pointer">isiZulu</p>
                                <p className="hover:bg-gray-100 p-2 rounded cursor-pointer">Afrikaans</p>
                                <p className="hover:bg-gray-100 p-2 rounded cursor-pointer">Sesotho</p>
                            </div>
                        )}
                    </div>
                    
























                </div>

            </div>
        </div>
    )
}

export default NavBar
