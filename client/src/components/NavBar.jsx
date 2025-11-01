import React, { useState, useRef, useContext, useEffect } from 'react'
import { assets } from "../assets/assets"
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { ChevronDown } from "lucide-react";
import AppContext from '../context/AppContext';
import AppContextProvider from '../context/AppContextProvider';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import moment from 'moment/min/moment-with-locales';
const NavBar = () => {
    const { t, i18n } = useTranslation();
    const { openSignIn } = useClerk();
    const { user } = useUser();


    //Login Modal 
    const { setRecruiterLogin, handleLanguageChange, backendUrl, setJobs, } = useContext(AppContext)
    //this is the hamburger menu for responsiveness

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const [menuOpen, setMenuOpen] = useState(false);


    //this is for the language translations switcher
    const languages = ["en", "zu", "af", "st"];
    const languageNames = { en: "English", zu: "isiZulu", af: "Afrikaans", st: "Sesotho" };
    const [loadingLang, setLoadingLang] = useState(false);
    const [pauseSpin, setPauseSpin] = useState(false);

    const delay = (ms) => new Promise((r) => setTimeout(r, ms));


    const changeLanguage = async (lang) => {
        try {
            await delay(100)
            await i18n.changeLanguage(lang);
            localStorage.setItem("lang", lang);
            moment.locale(lang.split("-")[0]);
            window.dispatchEvent(new CustomEvent("lang-change", { detail: lang }));
            setDropDown(false);
            setLoadingLang(true);
            await delay(1000);
            setTimeout(() => {
                setLoadingLang(false);
            }, 3000);
        } catch (e) {
            setLoadingLang(false);
            console.error(e);
        }
    };




    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);




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

    useEffect(() => {
        let alive = true;

        const fetchForLang = async (lang) => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/lang/jobs?lang=${lang}`);
                if (alive) setJobs(data.jobs || []);
            } catch (err) {
                if (alive) setJobs([]);

                console.error('lang fetch failed:', err?.message || err);
            }
        };


        const initialLang = localStorage.getItem('lang') || i18n.language || 'en';
        fetchForLang(initialLang);
        const handleLangChange = (e) => fetchForLang(e.detail);
        window.addEventListener('lang-change', handleLangChange);
        return () => {
            alive = false;
            window.removeEventListener('lang-change', handleLangChange);
        };
    }, [backendUrl, i18n.language, setJobs]);

    //const lang = localStorage.getItem('lang') || 'en';
    //const res = await fetch(`/api/jobs/${id}?lang=${lang}`);
    //const { job } = await res.json();


    return (
        <div className='fixed top-0 left-0 w-full z-50 shadow py-4 bg-white '>
            <div className='container px-4 2xl:px-12 mx-auto flex justify-between items-center'>

                {/* Logo */}
                <Link to={'/'}>
                    <img
                        src={assets.logo}
                        alt='Site Logo'
                        className="w-23 h-9"
                    />
                </Link>

                {/* Right Side Nav */}
                <div className='flex flex-col sm:flex-row items-end sm:items-center gap-4 sm:gap-6'>

                    {/* Login or User Info */}
                    {user ? (
                        <div className='flex items-center gap-4 text-sm sm:text-base'>
                            <Link to="/applications" className='hover:underline'>{t('Applied Jobs')}</Link>
                            <span className='hidden sm:inline'>|</span>
                            <p className='hidden sm:inline'>{t('Hi')}, {user.firstName} {user.lastName}</p>
                            <UserButton />
                        </div>
                    ) : (
                        <div className='flex items-center gap-2 sm:gap-4 text-xs sm:text-sm'>
                            <button onClick={() => setRecruiterLogin(true)} className='text-gray-600 hover:underline'>{t('Recruiter Portal')}</button>
                            <button
                                onClick={openSignIn}
                                className='border bg-blue-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-white hover:text-black hover:border hover:border-black transition'
                            >
                                {t('Login')}
                            </button>
                        </div>
                    )}

                    {/* Language Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            className="flex items-center gap-1 text-sm border border-black rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-black hover:bg-blue-600 hover:text-white transition"
                            aria-haspopup="listbox"
                            aria-expanded={dropdown ? "true" : "false"}
                        >
                            {t('Language')}
                            <ChevronDown size={16} className="text-inherit" />
                        </button>

                        {dropdown && (
                            <div className="absolute top-full mt-2 right-0 bg-white border rounded shadow p-3 text-sm z-10 min-w-[120px]">
                                {languages.map((lang) => (
                                    <p
                                        key={lang}
                                        className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                                        onClick={() => changeLanguage(lang)}
                                    >
                                        {languageNames[lang]}
                                    </p>
                                ))}

                            </div>
                        )}
                        {loadingLang && (
                            <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
                                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-[spin_3s_linear_infinite]" />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );


}

export default NavBar
