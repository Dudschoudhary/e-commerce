import { BsFillCartFill } from "react-icons/bs"; 
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Navbar : React.FC = () => {
  const cartItems:any = useSelector<RootState>(state=>state.products.cart)
  console.log(cartItems)
  return (
    <nav className='bg-[#958936] w-full h-14 flex justify-around items-center poppins-black'>
        <Link to="/"><h1 className='text-white text-lg  '>E-commerce</h1></Link>
        <ul className="flex  text-white gap-3 justify-center items-center">
          <li> <Link to="category/mens">Men's</Link></li>
          <li><Link to="category/jewelery">Jewelery</Link></li>
          <li><Link to="category/electronics">Electronics</Link></li>
          <li><Link to="category/women">Women's</Link></li>
        </ul>
        <Link to="/cart-items" className="relative bg-white rounded-full flex items-center h-10 w-10 justify-center "><BsFillCartFill/> <span className="absolute -top-1.5 text-red-600">{cartItems.length}</span></Link>
    </nav>
  )
}

export default Navbar