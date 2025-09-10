import { useNavigate, useParams } from "react-router-dom"
import products from '../Data/temp.json'

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
        <div>
             <div className="w-200 h-140">
                <img className="object-cover w-full h-full rounded-lg" src={product.image}></img>
            </div>
             <button 
                onClick={()=>navigate('/')}
                className="w-40 bg-zinc-200">
                    Back
                </button>
        </div>
    )
}