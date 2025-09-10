import { useNavigate, useParams } from "react-router-dom"
import products from '../Data/temp.json'
import { AppHeader } from "./AppHeader";

export default function Details(){
    const {id} = useParams();
    const navigate = useNavigate();

    const product = products.find((product) => String(product.id) === id);

    if(!product) {
        return (
            <div>Product Not Found</div>
        )
    }

    return (
        <>
            <div className="pt-6 pb-6 pl-20 pr-20">
                <div className="pb-3">
                    <AppHeader />
                </div>

                <div className="flex flex-row gap-20">
                    {/* Left Side */}
                    <div className="w-113 h-150">
                        <img className="object-cover w-full h-full" src={product.image}></img>
                    </div>

                    {/*Right Side*/}
                    <div>
                        <button 
                        onClick={()=>navigate('/')}
                        className="hover:cursor-pointer"
                        >
                            <img src="/icons/arrow-return-left.svg"></img>
                        </button>
                    </div>
                </div>
               
            </div>
        </>
    )
}