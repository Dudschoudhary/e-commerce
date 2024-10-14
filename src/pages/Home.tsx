import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/ecommerce/ecommerceSlice';
import { AppDispatch, RootState } from '../app/store';
import { Link } from 'react-router-dom';

const   Home: React.FC = () => {
  const dispatch : AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const [search, setSearch ] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([])

  function formHandler(e:React.FormEvent){
    e.preventDefault();
    if(search == ''){
      alert('type something to search')
    }
    else {
      const filtered:any  = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
      setFilteredProducts(filtered)
    }
    
  }
   
  // const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
    
 

  useEffect(() => {
    dispatch(fetchProducts) 
    console.log(search)
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]); 

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <form onSubmit={formHandler}>
        <input type="text" placeholder='Search procuct' value={search} onChange={(e)=>setSearch(e.target.value)} className='form-control border w-[94%] m-auto outline-none px-4 py-1 my-4 rounded-s'/>
        <button className='bg-sky-600 border py-1 px-4 rounded-e text-white'>search</button>
      </form>
      <h2 className="text-2xl mb-4">Products</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProducts.length > 0 ? (
          filteredProducts.map((product:any) => (
            <li key={product.id} className="border p-4 rounded shadow">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-2" />
                <h3 className="font-semibold">{product.title}</h3>
                <p>${product.price}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No products found</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
