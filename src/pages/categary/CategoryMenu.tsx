import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../../features/ecommerce/ecommerceSlice'

const Mens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const products: any = useSelector<RootState>(state => state.products.products);
  const { categoryName } = useParams();
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products by category
  const filteredByCategory = products.filter((product: any) => 
    product.category.replace(/'/g, "").toLowerCase() === categoryName?.toLowerCase()
  );

  // Further filter the already filtered products by search term
  const filteredProducts = filteredByCategory.filter(product => 
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='p-4'>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='my-4'>
          <input 
            type="text" 
            placeholder='Search.....' 
            className='px-4 py-1 outline-none border rounded-s w-[94%]' 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className='border px-4 py-1 rounded-e bg-sky-600'>Search</button>
        </div>
      </form>
      <h2 className="text-2xl mb-4">{categoryName}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <li key={product.id} className="border p-4 rounded shadow">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-2" />
                <h3 className="font-semibold">{product.title}</h3>
                <p>${product.price}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ul>
    </div>
  );
}

export default Mens;
