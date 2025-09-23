import { AppHeader } from "./AppHeader"
import { useNavigate } from "react-router-dom"

export default function Cart() {
    const navigate = useNavigate();

    return (
        <>
            <div className='pt-6 pb-6 pl-20 pr-20'>
                <AppHeader />
                <h1>Cart</h1>
                <button onClick={()=>navigate('/')} className="hover:cursor-pointer">
                    <img src="/icons/arrow-return-left.svg"></img>
                </button>
            </div>
        </>
    )
}