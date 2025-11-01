//recruiter view applications
import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { JobCategories, JobLocations } from '../assets/assets';
import { translateText } from '../utils/translate';
import axios from 'axios';
import AppContextProvider from '../context/AppContextProvider';
import App from '../App';
import AppContext from '../context/AppContext';
import toast from 'react-hot-toast';

const AddJob = () => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState(JobLocations[0]);
    const [category, setCategory] = useState(JobCategories[0]);
    const [level, setLevel] = useState("Beginner Level");
    const [salary, setSalary] = useState(0)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const { backendUrl, companyToken } = useContext(AppContext)
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const description = quillRef.current.root.innerHTML;
            const { data } = await axios.post(backendUrl + '/api/company/post-job',

                { title, description, location, salary, category, level },
                { headers: { token: companyToken } }
            )

            if (data.success) {
                toast.success("Job succesfully posted!")
                setTitle('')
                setSalary(0)
                quillRef.current.root.innerHTML = "";
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        // Quill once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Write job description here...',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link']
                    ]
                }
            })
        }


    }, [])
    return (
        <form onSubmit={onSubmitHandler} className="block w-full max-w-5xl mx-auto m-0 p-4 flex flex-col items-start gap-3">
            <div className='w-full'>
                <p className='mb-2 font-medium text-lg'>Job Title</p>
                <input
                    type='text'
                    placeholder='Type here'
                    onChange={e => setTitle(e.target.value)} value={title}
                    required
                    className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
                />
            </div>

            <div className='w-full max-w-lg'>
                <p className='my-2 font-medium text-lg'>
                    Job Description
                </p>
                <div ref={editorRef}>

                </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2 font-medium text-lg'>Job Category</p>
                    <select className=' w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setCategory(e.target.value)}>
                        {JobCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className='mb-2 font-medium text-lg' >Job Location</p>
                    <select className=' w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLocation(e.target.value)}>
                        {JobLocations.map((Location, index) => (
                            <option key={index} value={Location}>{Location}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <p className='mb-2 font-medium text-lg'>Job Level</p>
                    <select className=' w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLevel(e.target.value)}>
                        <option value="Beginner Level"> Beginner Level</option>
                        <option value="Intermediate Level"> Intermediate Level</option>
                        <option value="Senior Level"> Senior Level</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2 font-medium text-lg' >Job Salary</p>
                    <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded-sm:w-[120px]' onChange={e => setSalary(e.target.value)} type='number' placeholder='30000'></input>
                </div>

            </div>

            <button className='w-28 py-2 mt-4 bg-blue-600 text-white hover:bg-white hover:text-black hover:border hover:border-black transition '> Add </button>

        </form>
    )
}

export default AddJob