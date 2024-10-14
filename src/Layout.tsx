import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './features/ecommerce/ecommerceSlice'
import { AppDispatch } from './app/store'
import { RootState } from './app/store'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import '../src/assets/style/style.css'
const Layout : React.FC = ()=> {
  const dispatch = useDispatch<AppDispatch>()
  const productData = useSelector<RootState>(state => state.products.products)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  console.log(productData)
  return (
    <>

        <main className='min-h-[calc(100vh-56px)]'>
        <Navbar />
        <Outlet/>
        </main>
        <Footer/>
    </>
  )
}

export default Layout