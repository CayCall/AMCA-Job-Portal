import React, { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import AppContext from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { useClerk } from '@clerk/clerk-react'

const ROLE_KEY = "amka_role";

const Hero = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setSearchFilter, setIsSearched, setRecruiterLogin } = useContext(AppContext);

    const { openSignIn } = useClerk();

    const [role, setRole] = useState(
        () => localStorage.getItem(ROLE_KEY) || "jobseeker"
    );
    const updateRole = (next) => {
        setRole(next);
        localStorage.setItem(ROLE_KEY, next);
        if (next == "jobseeker") {
            openSignIn()
        }
        if (next == "recruiter") {
            setRecruiterLogin(true);
        }


    };


    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const [titleIn, setTitleIn] = useState("");
    const [locationIn, setLocationIn] = useState("");

    useEffect(() => {
        const id = setTimeout(() => {
            setSearchFilter({ title: titleIn, location: locationIn });
            setIsSearched(true);
        }, 300);
        return () => clearTimeout(id);
    }, [titleIn, locationIn, setSearchFilter, setIsSearched]);

    const onSearch = () => {

        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value,
        });
        setIsSearched(true);

    };


    return (
        <div className="container 2x1:px-20 mx-auto mb-10 mt-24">
            <div className="bg-gradient-to-r from-slate-500 to-black text-white py-16 text-center mx-2 rounded-xl relative">
                {/* Orb container */}
                <div className="relative w-full h-[400px] sm:h-[450px] md:h-[300px]">
                    {/*code for Orb taken from react bits https://reactbits.dev/backgrounds/orb */}

                    {/* Overlay content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h2 className="text-2xl md:text-2xl lg:text-4xl font-medium mb-4">
                            {t("Over 1 000+ Domestic jobs available")}
                        </h2>
                        <p className="mb-6 max-w-xl mx-auto text-sm font-light px-5 leading-relaxed">
                            {t("Meeting people where they are, not just where we wish they were.")}
                        </p>

                        {/* Role tabs */}
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <button
                                onClick={() => updateRole("jobseeker")}
                                className={`px-7 py-2 rounded-lg border transition ${role === "jobseeker"
                                    ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                                    : "bg-white text-gray-800"
                                    }`}
                            >
                                {t("I’m a Job Seeker")}
                            </button>
                            <button
                                onClick={() => updateRole("recruiter")}
                                className={`px-7 py-2 rounded-lg border transition ${role === "recruiter"
                                    ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                                    : "bg-white text-gray-800"
                                    }`}
                            >
                                {t("I’m a Recruiter")}
                            </button>
                        </div>

                        {/* Search bar */}
                        <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
                            <div className="flex items-center">
                                <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
                                <input
                                    type="text"
                                    placeholder={t('Search For Jobs')}
                                    className="max-sm:text-xs p-2 rounded outline-none w-full"
                                    ref={titleRef}
                                    onChange={(e) => setTitleIn(e.target.value)}
                                    disabled={role === "recruiter"}
                                />
                            </div>
                            <div className="flex items-center">
                                <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
                                <input
                                    type="text"
                                    placeholder={t('Location')}
                                    className="max-sm:text-xs p-2 rounded outline-none w-full"
                                    ref={locationRef}
                                    onChange={(e) => setLocationIn(e.target.value)}
                                    disabled={role === "recruiter"}
                                />
                            </div>
                            <button
                                onClick={onSearch}
                                className="bg-blue-600 px-6 py-2 rounded text-white m-1"
                            >
                                {t('Search')}
                            </button>
                        </div>

                        <p className="mt-3 text-xs opacity-80">
                            {role === "recruiter"
                                ? t("Post a job, manage applicants, and hire talent.")
                                : t("Search, filter, save, and apply to jobs.")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default Hero;
