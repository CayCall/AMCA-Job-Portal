import React from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import Footer from '../components/Footer'
import { Import } from 'lucide-react'
import NoticePopup from '../components/NoticePopup.jsx'


const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <JobListing />
      <Footer />
      <NoticePopup />
    </div>
  )
}

export default Home