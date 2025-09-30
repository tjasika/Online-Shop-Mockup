import { AppHeader } from "./AppHeader"
import { useNavigate } from "react-router-dom"

export default function Cart({cartItems, removeFromCart, updateQuantity}) {
    const navigate = useNavigate();
    console.log("Cart items:", cartItems);

    return (
        <>
            <div className='pt-6 pb-6 pl-20 pr-20'>
                <AppHeader />

                <h1 className="font-instrument font-medium text-3xl pb-3 pt-5">Shopping Cart</h1>
                <button onClick={()=>navigate('/')} className="hover:cursor-pointer">
                    <img src="/icons/arrow-return-left.svg"></img>
                </button>

                <div>
                    {cartItems.map((item, index)=> (
                        <div key={index}>
                            <h3>{item.productName}</h3>
                            <p>Price: ${item.productPrice}</p>
                            <p>Size: {item.sizeName}</p>
                            <p>Color: {item.colorName}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}