import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applications from './pages/Applications'
import ApplyJob from './pages/ApplyJob'
import RecruiterModal from './components/RecruiterModal'
import AppContext from './context/AppContext'
import RecruiterDashboard from './components/RecruiterDashboard'
import RecruiterManage from './components/RecruiterManage'
import AddJob from './components/AddJob'
import ViewApplications from './components/ViewApplications'
import 'quill/dist/quill.snow.css'


const App = () => {
  const { showRecruiterLogin } = useContext(AppContext)
  return (
    <div>
      {
        showRecruiterLogin && <RecruiterModal />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />}/>
        <Route path='/applications' element={<Applications />}/>
        <Route path='/dashboard' element={< RecruiterDashboard/>}>
          <Route path='add-job' element={< AddJob />} />
          <Route path='manage-jobs' element={< RecruiterManage />} />
          <Route path='view-applications' element={< ViewApplications />} />
        </Route>


      </Routes>

    </div>
  )
}

export default App