import React, { use, useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import AppContext from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';


const RecruiterModal = () => {

  const [active, setActive] = useState('Login')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('')

  const [image, setImage] = useState(null)

  const [submitData, SetData] = useState(false)

  const { setRecruiterLogin, API_BASE, setCompanyToken, setCompanyData } = useContext(AppContext);

  const [hasSubmitted, setSubmit] = useState(false)

  const navigate = useNavigate();






  const onSubmitHandler = async (e) => {
    e.preventDefault();



    if (active == "Sign Up" && !submitData) {
      return SetData(true);
    }

    try {
      if (active === "Login") {
        const { data } = await axios.post(`${API_BASE}/api/company/login`, { email, password })
        if (data.success) {
          setCompanyData(data.company)
          setCompanyToken(data.token)
          localStorage.setItem('companyToken', data.token)
          setRecruiterLogin(false)
          navigate('/dashboard')
          toast.success("Successfully logged in.")
        }
        else {
          toast.error(data.message)
        }
      }
      else {
        const formInfo = new FormData()

        formInfo.append('name', name)
        formInfo.append('password', password)
        formInfo.append('email', email)
        formInfo.append('image', image)
        const { data } = await axios.post(`${API_BASE}/api/company/register`, formInfo)

        if (data.success) {
          setCompanyData(data.company)
          setCompanyToken(data.token)
          localStorage.setItem('companyToken', data.token)
          setRecruiterLogin(false)
          navigate('/dashboard')
          toast.success("Account created successfully.");
        } else {
          toast.error(data.message || "Something went wrong during signup.")
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message ||"An unexpected error occurred. Please try again.")
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  })





  return (
    <div className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4">
      <form onSubmit={onSubmitHandler} className="relative bg-white p-6 sm:p-12 rounded-xl text-slate-500 w-full max-w-sm sm:max-w-md max-h-[90vh] sm:h-[480px] flex flex-col justify-start overflow-auto" action="">
        <h1 className='text-center text-2xl text-neutral-700 font-medium'> Recruiter {active}</h1>

        {active === "Login"
          ? <p className='text-sm text-center'> Welcome back ! Please sign in to continue</p>
          : <p className='text-sm text-center'> Welcome ! Please sign up to continue</p>
        }
        {
          active === "Sign Up" && submitData
            ? <>

              <div className="flex flex-col items-center justify-center my-10">
                <label htmlFor="image" className="flex flex-col items-center cursor-pointer group">

                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center group-hover:border-blue-500 transition">
                    <img
                      className="w-full h-full object-cover"
                      src={image ? URL.createObjectURL(image) : assets.upload_area}
                      alt="profile"
                    />
                  </div>

                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setImage(e.target.files[0]);
                      }
                    }}
                  />

                  <p className="mt-2 text-center text-sm text-gray-600">
                    Upload Company <br />Logo
                  </p>
                </label>
              </div>


            </>
            : <>
              {active !== "Login" && (
                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                  <img src={assets.person_icon} alt="" />
                  <input className='outline-none text-sm ' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name' required />
                </div>
              )}

              <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.email_icon} alt="" />
                <input className='outline-none text-sm ' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email' required />
              </div>
              <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.lock_icon} alt="" />

                <input
                  className='outline-none text-sm flex-1'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  required
                />

                <img
                  src={showPassword ? assets.show : assets.hide}
                  alt="toggle password"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                  className='w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition'
                />
              </div>

            </>
        }
        {active === "Login" ? <p className='text-sm text-blue-600 ml-1 my-4 cursor-pointer'>Forgot password?</p> :
          ""}

        <button type='submit' className='mt-4 border bg-blue-600 w-full text-white py-2 rounded-full hover:bg-white hover:text-black hover:border hover:border-black transition '>
          {active === "Login" ? 'Login' : submitData ? 'Sign Up' : 'Next'}
        </button>

        {active === "Login"
          ? <p className='mt-5 text-center '>Don't have an account?<span className="text-blue-400 cursor-pointer   hover:text-blue-600" onClick={() => setActive("Sign Up")}> Sign Up </span></p>
          : <p className='mt-5 text-center '>Already have an account?<span className="text-blue-400 cursor-pointer hover:text-blue-600" onClick={() => setActive("Login")}> Login </span></p>
        }

        <img onClick={() => setRecruiterLogin(false)} className='absolute w-4 h-4 top-5 right-5 cursor-pointer' src={assets.cross_icon} />

      </form>
    </div>
  )
}

export default RecruiterModal