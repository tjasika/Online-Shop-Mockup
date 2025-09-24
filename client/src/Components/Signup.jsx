import {useNavigate, Link} from 'react-router-dom'
import { useState } from 'react';
import { AppHeader } from './AppHeader';
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!values.password || !values.firstName || !values.lastName || !values.email || !values.confirmPassword) {
            setMsg("All fields required.");
            console.log(`Some or all fields empty.`);
            return;
        }
        if(values.password !== values.confirmPassword) {
                setMsg("Passwords don't match.");
                console.log(`Passwords don't match.`);
                return;
            }
        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            })
            setMsg("User created successfully!");
            setValues({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            })

            } catch(err) {
                console.log("Error:", err);
            } 
        }
    
    return (
            <>
                <div className='pt-6 pb-6 pl-20 pr-20'>
                    <AppHeader />
                    <button onClick={()=>navigate('/')} className="hover:cursor-pointer">
                            <img src="/icons/arrow-return-left.svg"></img>
                    </button>
                    <div className='mt-5'>
                        <h1 className='text-2xl font-instrumental font-medium'>Sign Up</h1>
                        <div className='mt-3 w-200'>
                             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="text" name="firstName" placeholder="First Name" value={values.firstName} onChange={handleChange} required></input>
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="text" name="lastName" placeholder="Last Name" value={values.lastName} onChange={handleChange} required></input>
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} required></input>
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} required></input>
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="password" name="confirmPassword" placeholder="Confirm Password" value={values.confirmPassword} onChange={handleChange} required></input>
                                <button className="bg-zinc-700 text-white border-zinc-900 p-3 rounded-xl w-100 hover:cursor-pointer hover:bg-zinc-600" 
                                type="submit">Sign Up</button>
                            </form>
                             {msg && <p>{msg}</p>}
                            <div className='mt-5'>
                                <span>Already have an account? </span>
                                <Link to='/login' className='font-bold text-zinc-700 hover:underline'>Log In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}