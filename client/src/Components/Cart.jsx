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
                        <div className="flex flex-col gap-3">
                        {cartItems.map((item) => (
                            <div key={item.cart_item_id} className="w-200 flex flex-row gap-5 h-50">
                                <div>
                                    <img src={item.product_image} alt={item.product_name} className="w-30 h-50 object-cover" />
                                </div>
                                <div className="flex flex-col justify-center w-50">
                                    <p className="uppercase font-instrument text-md">{item.product_name}</p>
                                    <p className="font-medium text-lg">${item.product_price}</p>
                                    <p>Size: {item.size_name}</p>
                                    <p>Color: {item.color_name}</p>
                                </div>
                                <div className="flex flex-col justify-center ml-3">
                                    <span className="pb-2">Quantity:</span>
                                    <div className="border-1 rounded-3xl flex flex-row gap-4 w-30 p-2 justify-center">
                                        <button onClick={()=>updateQuantity(item.cart_item_id, item.quantity + 1)} className="hover:cursor-pointer"><img src="/icons/plus.svg"></img></button>
                                        <span>{item.quantity}</span>
                                        <button onClick={()=>updateQuantity(item.cart_item_id, item.quantity - 1)} className="hover:cursor-pointer"><img src="/icons/dash.svg"></img></button>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center ml-3">
                                    <span className="pb-2">Total:</span>
                                    <span>{item.product_price * item.quantity}</span>
                                </div>
                            </div>
                        ))}
                        </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}