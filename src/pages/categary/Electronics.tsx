import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Link } from 'react-router-dom'

const Electronics = () => {
    const products: any = useSelector<RootState>(state => state.products.products)

    const category: any = products.filter((item: any) => item.category === 'electronics')
    console.log(category)
    return (
        <div className='p-4'>
            <h2 className="text-2xl mb-4">Electronics</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.map((product: any) => (
                    <li key={product.id} className="border p-4 rounded shadow">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-2" />
                            <h3 className="font-semibold">{product.title}</h3>
                            <p>${product.price}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>)
}

export default Electronics