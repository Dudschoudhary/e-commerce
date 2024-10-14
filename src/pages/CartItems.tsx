import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

function CartItems() {
    const cartItemsIds:any = useSelector<RootState>(state => state.products.cart)  // [1,2,3]
    const products:any = useSelector<RootState>(state => state.products.products)   //[{item1},{item2},{item3}]
    let cartItems:any=[];   
    cartItemsIds.map((itemID:any)=>cartItems.push(products.find((product:any)=>product.id==itemID)))
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
                            <span className="text-gray-600">${item.price.toFixed(2)}</span>
                        </li>
                        
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CartItems

//cartItemsIds.map((item) => cartItmes.push(products.find((product) => item === product.id)))
