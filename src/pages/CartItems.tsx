import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { removeFromCart } from '../features/ecommerce/ecommerceSlice';
import { IoMdClose } from "react-icons/io";

function CartItems() {
    const cartItems: any = useSelector<RootState>(state => state.products.cart);

    const total = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

    const discountPercent = 0.10; // 10%
    const totalDiscount = total * discountPercent;
    const afterDiscountAmount = total - totalDiscount;
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between items-center border-b pb-2 ">
                            <span className="font-medium flex-1">{item.title}</span>
                            <span className="text-gray-600 flex-1">Quantity:- <label className='text-black font-bold'>{item.quantity}</label></span>
                            <span className="text-black flex-1 font-bold">${(item.price * item.quantity)}</span>
                            <button className='flex-none border rounded px-2 py-1 bg-red-500 text-white hover:bg-red-600' onClick={() => dispatch(removeFromCart(item.id))}><IoMdClose /></button>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <div className="mt-4">
                    <div className="mt-2 font-bold text-end">
                        Total: ${total.toFixed(2)}
                    </div>
                    <div className='mt-2 text-end text-red-600'>
                        Discount (10%): ${totalDiscount.toFixed(2)}
                    </div>
                    <div className='mt-2 text-end '>
                        After Discount: ${afterDiscountAmount.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartItems;
