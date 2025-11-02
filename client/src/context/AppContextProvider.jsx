import { useEffect, useState } from 'react';
import AppContext from './AppContext';
import { jobsData } from "../assets/assets"
import i18n from '../i18n';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth, useUser } from '@clerk/clerk-react';
const AppContextProvider = (props) => {
  // this will be for connecting our backend to our front end 
  const API_BASE =
    import.meta.env.VITE_BACKEND_URL?.trim()
      ? import.meta.env.VITE_BACKEND_URL
      : (import.meta.env.DEV ? (import.meta.env.VITE_BACKEND_URL || "") : "");
  const { user } = useUser()
  const { getToken } = useAuth()
  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: '',
  })
  const [isSearched, setIsSearched] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  const [showRecruiterLogin, setRecruiterLogin] = useState(false)


  const [companyToken, setCompanyToken] = useState(null)
  const [companyData, setCompanyData] = useState(null)

  const [userData, setUserData] = useState(null)
  const [userApplications, setUserApplications] = useState([])

  // JOB SEEKER SIDE fetch jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/jobs/`)

      if (data.success) {
        setJobs(data.jobs);
        console.log(data.jobs)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  };
  const fetchJobsLang = async (l = lang) => {
    const { data } = await axios.get(`${API_BASE}/api/jobs?lang=${l}`);
    setJobs(data.jobs || []);
  };
  useEffect(() => {
    fetchJobs(lang);
  }, [lang]);

  useEffect(() => {
    const onLang = (e) => setLang(e.detail || 'en');   // updates state -> triggers fetch
    window.addEventListener('lang-change', onLang);
    return () => window.removeEventListener('lang-change', onLang);
  }, []);

  // RECRUITER SIDE

  //get company data
  const fetchDataCompany = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/company/company`, { headers: { token: companyToken } })

      if (data.success) {
        setCompanyData(data.company)
        console.log(data)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem('companyToken')
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchDataCompany();
    }
  }, [companyToken])


  const handleLanguageChange = async (lang) => {
    await i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };


  // fetch user info
  const fetchUserInfo = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(`${API_BASE}/api/users/user`,

        { headers: { Authorization: `Bearer ${token}` } }

      )

      if (data.success) {
        setUserData(data.user)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // this gets the data of all the job applications thae users had applied for
  const fetchApplications = async () => {
    try {
      const token = await getToken()
      if (!token) return;

      const { data } = await axios.get(
        `${API_BASE}/api/users/applications`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setUserApplications(Array.isArray(data.appliedJobs) ? data.appliedJobs : []);

      }
      else {
        toast.error(data?.message || 'Failed to load applications.')
        setUserApplications([]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
      setUserApplications([]);
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserInfo();
      fetchApplications();
    }
  }, [user])


  const value = {
    setSearchFilter, searchFilter,
    isSearched, setIsSearched,
    jobs, setJobs,
    showRecruiterLogin, setRecruiterLogin,
    handleLanguageChange,
    companyToken, setCompanyToken,
    companyData, setCompanyData,
    API_BASE,
    userData, setUserData,
    userApplications, setUserApplications,
    fetchUserInfo,
    fetchApplications,
    lang,
    fetchJobsLang
  }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

//allow me to make the context value avaible anywhere in my application
// value = {} is the data shared across components
//Using the context provider (<AppContext.Provider>).
//Passing in the value to share globally (value={value}).
//Wrapping all children of this provider ({props.children}) so they can access the context.