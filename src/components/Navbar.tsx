import { BsFillCartFill } from "react-icons/bs"; 
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Navbar : React.FC = () => {
  const cartItems:any = useSelector<RootState>(state=>state.products.cart)
  return (
    <nav className='bg-[#a1a088] w-full  h-14 flex justify-around items-center poppins-black'>
        <Link to="/"><h1 className='text-white text-lg  '>E-commerce</h1></Link>
        <ul className="sm:flex  text-white hidden gap-3 justify-center items-center">
          <li> <Link to="/category/mens clothing">Men's</Link></li>
          <li><Link to="/category/jewelery">Jewelery</Link></li>
          <li><Link to="/category/electronics">Electronics</Link></li>
          <li><Link to="/category/womens clothing">Women's</Link></li>
        </ul>
        <Link to="cart-items" className="relative flex items-center justify-center "><BsFillCartFill className="text-white text-2xl"/> <span className="absolute -top-1 left-2 border w-5 h-5 flex justify-center items-center rounded-full text-white bg-red-600">{cartItems.length}</span><span className="text-white text-xl ms-2">cart</span> </Link>
    </nav>
  )
}

export default Navbar