import {useNavigate} from 'react-router-dom'
import { AppHeader } from './AppHeader';

export default function Login() {
    const navigate = useNavigate();
    return (
            <>
                <div className='pt-6 pb-6 pl-20 pr-20'>
                    <AppHeader />
                    <h1>Log In</h1>
                    <button onClick={()=>navigate('/')} className="hover:cursor-pointer">
                        <img src="/icons/arrow-return-left.svg"></img>
                    </button>
                </div>
            </>
        )
}