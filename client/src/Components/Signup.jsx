import {useNavigate, Link} from 'react-router-dom'
import { AppHeader } from './AppHeader';

export default function Signup() {
    const navigate = useNavigate();
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
                             <form className="flex flex-col gap-4">
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="text" name="firstName" placeholder="First Name"></input>
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="text" name="lastName" placeholder="Last Name"></input>
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="text" name="email" placeholder="Email"></input>
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="password" name="password" placeholder="Password"></input>
                                <input className="h-10 p-3 outline outline-neutral-400 rounded-md" type="password" name="confirmPassword" placeholder="Confirm Password"></input>
                                <button className="bg-zinc-700 text-white border-zinc-900 p-3 rounded-xl w-100 hover:cursor-pointer hover:bg-zinc-600" 
                                type="submit">Sign Up</button>
                            </form>
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