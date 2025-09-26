import { useNavigate, useParams } from "react-router-dom"
import { AppHeader } from "./AppHeader";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Details(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState(null);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch(err) {
                console.error('Error fetching products:', err);
            }
        };
        fetchProduct();
    }, [id])

    if(!product) {
        return (
            <div>
                Product Not Found
            </div>
        )
    }

     useEffect(() => {
        const fetchSizes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}/sizes`);
                setSizes(response.data);
            } catch(err) {
                console.error('Error fetching sizes:', err);
            }
        };
        fetchSizes();
    }, [id])


    return (
        <>
            <div className="pt-6 pb-6 pl-20 pr-20">
                <div className="pb-3">
                    <AppHeader />
                </div>

                <div className="flex flex-row gap-20">
                    {/* Left Side */}
                    <div className="w-110 h-150">
                        <img className="object-cover w-full h-full" src={product.image}></img>
                    </div>

                    {/*Right Side*/}
                    <div className="flex flex-col justify-center items-left font-instrument">
                        <h1 className="uppercase text-3xl">{product.name}</h1>
                        <h2 className="text-3xl font-medium">$ {product.price}</h2>
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