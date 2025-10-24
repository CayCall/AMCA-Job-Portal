import { useEffect, useState } from 'react';
import AppContext from './AppContext';
import { jobsData } from "../assets/assets"
import i18n from '../i18n';
import axios from 'axios';
import toast from 'react-hot-toast';
const AppContextProvider = (props) => {
  // this will be for connecting our backend to our front end 
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: '',
  })
  const [isSearched, setIsSearched] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setRecruiterLogin] = useState(false)


  const [companyToken, setCompanyToken] = useState(null)
  const [companyData, setCompanyData] = useState(null)



  // fetch jobs
  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  const fetchDataCompany = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })

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

  useEffect(()=>{
    if(companyToken){
      fetchDataCompany();
    }
  },[companyToken])

  const handleLanguageChange = async (lang) => {
    await i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };



  const value = {
    setSearchFilter, searchFilter,
    isSearched, setIsSearched,
    jobs, setJobs,
    showRecruiterLogin, setRecruiterLogin,
    handleLanguageChange,
    companyToken, setCompanyToken,
    companyData, setCompanyData,
    backendUrl
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