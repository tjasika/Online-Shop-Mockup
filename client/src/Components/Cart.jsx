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
                    {cartItems.lenghth === 0 ? (
                        <span>Shopping cart is empty.</span>
                    ) : (
                        <>
                        {cartItems.map((item) => (
                            <div key={item.cart_item_id}>
                                <img src={item.product_image} alt={item.product_name} className="w-20 h-20 object-cover" />
                                <h3>{item.product_name}</h3>
                                <p>Price: ${item.product_price}</p>
                                <p>Size: {item.size_name}</p>
                                <p>Color: {item.color_name}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        ))}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}