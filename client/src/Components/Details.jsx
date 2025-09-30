import { useNavigate, useParams } from "react-router-dom"
import { AppHeader } from "./AppHeader";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Details({addToCart}){
    const {id} = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    
    
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

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}/colors`);
                setColors(response.data);
            } catch(err) {
                console.error('Error fetching colors:', err);
            }
        };
        fetchColors();
    }, [id])

    console.log("Sizes state:", sizes);

    if(!product) {
        return (
            <div>
                Product Not Found
            </div>
        )
    }


    return (
        <>
            <div className="pt-6 pb-6 pl-20 pr-20">
                <div className="pb-3">
                    <AppHeader />
                    <button 
                        onClick={()=>navigate('/')}
                        className="hover:cursor-pointer"
                        >
                            <img src="/icons/arrow-return-left.svg"></img>
                    </button>
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

                        <div className="grid grid-cols-4 gap-3 pt-5 pb-5 w-150 ">
                            {sizes.map((size) => (
                                <button 
                                    className={selectedSize === size.Id ? "bg-zinc-700 text-white rounded-xl w-20" : "border-1 rounded-xl w-20 hover:cursor-pointer hover:bg-zinc-700 hover:text-white"} 
                                    key={size.Id}
                                    onClick={()=> setSelectedSize(size.Id)}>
                                    {size.Name}
                                </button>
                            ))}
                        </div>
                       
                        <div className="grid grid-cols-4 gap-3 pt-5 pb-5 w-150">
                            {colors.map((color) => (
                                <button
                                    className={selectedColor === color.Id ? "underline" : "hover:cursor-pointer"}
                                    key={color.Id}
                                    onClick={()=> setSelectedColor(color.Id)}>
                                    {color.Name}
                                </button>
                            ))}
                        </div>

                        <div>
                            <button 
                                className="w-80 h-10 bg-zinc-700 text-white rounded-xl hover:cursor-pointer"
                                onClick={
                                    ()=> {
                                        if(selectedColor === null || selectedSize === null) {
                                            alert('Please select a color and size.');
                                            return;
                                        }
                                        addToCart(product, selectedSize, selectedColor)
                                        }
                                    }>
                                Add to cart
                            </button>
                        </div>
                        
                    </div>
                </div>
               
            </div>
        </>
    )
}