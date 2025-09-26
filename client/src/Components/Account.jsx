import { useNavigate } from "react-router-dom"
import { AppHeader } from "./AppHeader"

export default function Account({user, onLogout}) {

    const navigate = useNavigate();
    return (
        <div className='pt-6 pb-6 pl-20 pr-20'>
            <AppHeader />
            <button onClick={()=>navigate('/')} className="hover:cursor-pointer">
                    <img src="/icons/arrow-return-left.svg"></img>
            </button>
            <div className="pt-5">
                <h1 className="font-instrument font-medium text-3xl pb-3">Account</h1>
                <div className="pb-3">
                    <p>First name: <span className="font-medium">{user?.firstName}</span></p>
                    <p>Last name: <span className="font-medium">{user?.lastName}</span></p>
                    <p>Email: <span className="font-medium">{user?.email}</span></p>
                </div>
                <button 
                    className="w-30 outline border-zinc-900 p-1 rounded-3xl text-md hover:cursor-pointer hover:bg-zinc-700 hover:text-white" 
                    onClick={()=> {onLogout();}}>Log Out
                </button>
            </div>
        </div>

    )
}