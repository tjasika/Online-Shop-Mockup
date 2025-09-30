import { useState } from "react";
import { AppHeader } from "./AppHeader"
import { useNavigate } from "react-router-dom"

export default function Cart({cartItems, removeFromCart, updateQuantity}) {
    const navigate = useNavigate();
    console.log("Cart items:", cartItems);

    const[discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(0);

    const discountCodes = {
        "SAVE10": 0.10,
        "SAVE20": 0.20,
        "SAVE50": 0.30,
        "ILOVEYOU": 0.50
    }
    const deliveryFee = 3.99;
    const handleApplyDiscount = () => {
        if (discountCodes[discountCode]) {
            setAppliedDiscount(discountCodes[discountCode]);
            alert(`Discount applied: ${discountCodes[discountCode] * 100}% off`);
        } else {
            alert('Invalid discount code');
            setAppliedDiscount(0);
        }
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
    const discountAmount = subtotal * appliedDiscount;
    const total = subtotal - discountAmount + deliveryFee;

    return (
        <>
            <div className='pt-6 pb-6 pl-20 pr-20'>
                <AppHeader />

                <h1 className="font-instrument font-medium text-3xl pb-3 pt-5">Shopping Cart</h1>
                <button onClick={()=>navigate('/')} className="hover:cursor-pointer">
                    <img src="/icons/arrow-return-left.svg"></img>
                </button>

                <div className="flex justify-between">
                    {/*LEFT*/}
                    <div>
                        {cartItems.lenghth === 0 ? (
                            <span>Shopping cart is empty.</span>
                        ) : (
                            <>
                            <div className="flex flex-col gap-3 w-250">
                            {cartItems.map((item) => (
                                <div key={item.cart_item_id} className="flex flex-row gap-20 h-50">
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
                                            <button onClick={()=>updateQuantity(item.cart_item_id, item.quantity - 1)} className="hover:cursor-pointer">
                                                <img src="/icons/dash.svg"></img>
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={()=>updateQuantity(item.cart_item_id, item.quantity + 1)} className="hover:cursor-pointer">
                                                <img src="/icons/plus.svg"></img>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center ml-3">
                                        <span className="pb-2">Total:</span>
                                        <span className="text-xl font-medium">$ {item.product_price * item.quantity}</span>
                                    </div>
                                    <div className="flex flex-col justify-center ml-3">
                                        <button onClick={() => removeFromCart(item.cart_item_id)} className="hover:cursor-pointer">
                                            <img src="/icons/trash.svg"></img>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            </div>
                            <button onClick={()=>navigate('/')} className="hover:cursor-pointer hover:underline pt-5">
                                + ADD MORE
                            </button>
                            </>
                        )}
                    </div>

                    {/*RIGHT*/}
                    <div>
                        <div className="border-1 rounded-xl w-80 h-100 p-3">
                            <div className="flex justify-center pb-5">
                                <h1 className="text-xl font-medium font-instrumental">Order Summary:</h1>
                            </div>
                            <div className="flex justify-between w-70">
                                <div className="flex flex-col">
                                    <span>Subtotal</span>
                                    <span>Discount</span>
                                    <span>Delivery Fee:</span>
                                </div>
                                <div className="flex flex-col pb-5">
                                    <span>${subtotal}</span>
                                    <span>-${discountAmount}</span>
                                    <span>${deliveryFee}</span>
                                </div>
                            </div>
                            <div className="pb-10 flex justify-between w-70">
                                <span>Total: </span>
                                <span className="text-2xl font-medium">${total}</span>
                            </div>
                            <div>
                                <span className="italic">Add coupon code</span>
                                <input type="text"></input>
                            </div>
                            <div className="pt-10 flex justify-center w-full">
                                <button className="bg-zinc-700 text-white border-zinc-900 p-3 rounded-xl w-70 hover:cursor-pointer hover:bg-zinc-600">CHECKOUT NOW</button>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}