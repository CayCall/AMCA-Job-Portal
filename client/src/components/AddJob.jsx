import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const AddJob = () => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("Johannesburg")
    const [category, setCategory] = useState("Plumber")
    const [level, setLevel] = useState('Experienced')
    const [salary, setSalary] = useState(0)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

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
        <div>
            <p></p>
            <input
                type='text'
                placeholder='Type here'
                onChange={e => setTitle(e.target.value)} value={title}
                required
            />
            <div>
                <p>
                    Job Description
                </p>
                <div ref={editorRef}>

                </div>
            </div>
        </div>
    )
}

export default AddJob