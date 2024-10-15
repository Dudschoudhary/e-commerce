import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useState } from 'react';

function CartItems() {
    const [count, setCount] = useState(1)
    const cartItemsIds: any = useSelector<RootState>(state => state.products.cart);  // [1,2,3]
    const products: any = useSelector<RootState>(state => state.products.products);   //[{item1},{item2},{item3}]
    let cartItems: any = [];

    cartItemsIds.forEach((itemID: any) =>
        cartItems.push(products.find((product: any) => product.id === itemID))
    );

    // Calculate total price
    const total = cartItems.reduce((acc: number, item: any) => acc + (item ? item.price * count : 0), 0);

    // discount 
    const discoutPresent = 0.10; // 10%
    const totalDiscount = total * discoutPresent;
    const afterDiscountAmount = total - totalDiscount;

    const increment = () => {
        if (count < 10) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cartItems.map(item => (

                        <li key={item.id} className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">{item.title}</span>
                            <div className='flex justify-center items-center gap-2'>
                                <button onClick={decrement} className='border w-8 h-8 rounded-full flex justify-center items-center text-4xl'>-</button>
                                <div>
                                    <input readOnly className="px-1 w-10 border outline-none rounded text-center text-2xl " value={count} onChange={(e) => e.target.value} />
                                </div>
                                <button onClick={increment} className='border w-8 h-8 rounded-full flex justify-center items-center'>+</button>
                            </div>
                            <span className="text-gray-600">${total.toFixed(2)}</span>

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
                        Discount(10%) $ :- {totalDiscount.toFixed(2)}
                    </div>
                    <div className='mt-2 text-end '>
                        After Discount:- ${afterDiscountAmount.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartItems;
