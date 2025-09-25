import {useNavigate, Link} from 'react-router-dom'
import { AppHeader } from './AppHeader';
import axios from 'axios';
import { useState } from 'react';

export default function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "", 
        password: ""
    })
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email: values.email,
                password: values.password
            }, {
                withCredentials: true
            });
            
            setMsg("Login successful!");
            console.log("User data:", response.data.user);
            
            navigate('/');
            
        } catch (error) {
            console.log("Login error:", error);
            setMsg(error.response?.data?.message || "Login failed");
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
                        <h1 className='text-2xl font-instrumental font-medium'>Log In</h1>
                        <div className='mt-3 w-200'>
                             <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="text" name="email" placeholder="Email" onChange={handleChange} required></input>
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="password" name="password" placeholder="Password" onChange={handleChange} required></input>
                                <button className="bg-zinc-700 text-white border-zinc-900 p-3 rounded-xl w-100 hover:cursor-pointer hover:bg-zinc-600" 
                                type="submit">Log In</button>
                            </form>
                            {msg && <p>{msg}</p>}
                            <div className='mt-5'>
                                <span>Don't have an account? </span>
                                <Link to='/signup' className='font-bold text-zinc-700 hover:underline'>Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}