import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchProducts } from '../../features/ecommerce/ecommerceSlice'



const mens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products: any = useSelector<RootState>(state => state.products.products)
  const { categoryName } = useParams();
  const filtered = products.filter((product: any) => product.category.replace(/'/g, "").toLowerCase() === categoryName?.toLowerCase())

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <div className='p-4'>
        <h2 className="text-2xl mb-4">{categoryName}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product: any) => (
            <li key={product.id} className="border p-4 rounded shadow">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-2" />
                <h3 className="font-semibold">{product.title}</h3>
                <p>${product.price}</p>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </>
  )
}

export default mens 