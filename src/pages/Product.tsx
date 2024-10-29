import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../app/store'
import { addToCart } from '../features/ecommerce/ecommerceSlice'
import { useState } from 'react'
import { BsFillCartFill } from "react-icons/bs";


function Product() {
    const [clicked, setClicked] = useState(false);
    const [count, setCount ] = useState(1)

    const { productId } = useParams()
    const product: any = useSelector<RootState>(state => state.products.products.find(product => Number(product.id) === Number(productId)))
    
    const dispatch = useDispatch<AppDispatch>()
    const addToCartHandler = () => {
        dispatch(addToCart({ product, count })); 
        setClicked(true);
        
    };
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
    if (!product) return (
        <div className="max-w-md mx-auto p-4">
            <div className="animate-pulse">
                <div className="h-48 bg-gray-300 mb-4"></div>
                <div className="h-6 bg-gray-300 mb-2"></div>
                <div className="h-4 bg-gray-300 mb-2"></div>
                <div className="h-4 bg-gray-300 mb-4 w-1/2"></div>
                <div className="flex justify-between">
                    <div className="h-10 bg-gray-300 w-1/3 rounded"></div>
                    <div className="h-10 bg-gray-300 w-1/3 rounded"></div>
                </div>
            </div>
        </div>
    )
    

    return (
        <div className="max-w-md mx-auto p-4 border  mt-4 shadow-2xl">
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
            <h2 className="text-[16px] sm:text-xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2 text-sm sm:text-lg">{product.description}</p>
            <p className="text-lg font-semibold mb-4">${product.price}</p>
            <div className="flex justify-between">
                <button className="bg-blue-500 text-white px-3  py-0.5 text-[12px] rounded flex justify-center items-center" onClick={addToCartHandler}>{clicked ? 'Added to cart' : 'Add to cart'}<span className='mx-1 sm:mx-3'><BsFillCartFill /></span></button>
                <div className='flex justify-center items-center gap-2'>
                                <button onClick={decrement} className='border w-5 h-5 sm:w-8 sm:h-8 rounded-full flex justify-center items-center text-sm  sm:text-2xl font-bold bg-red-600 text-white'>-</button>
                                <div>
                                    <input readOnly className="px-1 w-5 text-sm sm:w-10 border outline-none rounded text-center sm:text-2xl " value={count} onChange={(e) => e.target.value} />
                                </div>
                                <button onClick={increment} className='border sm:w-8 sm:h-8 h-5 w-5 text-sm rounded-full flex justify-center items-center sm:text-2xl font-bold bg-green-800 text-white'>+</button>
                            </div>      
                <button className="bg-green-500 text-white px-2 py-0.5 rounded text-sm">Buy Now</button>
            </div>
        </div>
    )
}

export default Product
