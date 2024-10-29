import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/ecommerce/ecommerceSlice';
import { AppDispatch, RootState } from '../app/store';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../features/ecommerce/ecommerceSlice';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const navigation = useNavigate();

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (search === '') {
      alert('Type something to search');
    } else {
      navigation(`/search/${search}`);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [search, products]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="p-4 Poppins-Medium">
      <form onSubmit={formHandler}>
        <input
          type="text"
          placeholder='Search product'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='form-control border w-[65%] lg:w-[93%] m-auto outline-none px-4 py-1 my-4 rounded-s bg-gray-50'
        />
        <button className='bg-sky-600 border py-1 px-4 rounded-e text-white'>Search</button>
      </form>
      {suggestions.length > 0 && (
        <ul className="border border-gray-300 rounded bg-white absolute z-10 w-[94%] m-auto">
          {suggestions.map((product) => (
            <li key={product.id} className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setSearch(product.title);
                navigation(`/product/${product.id}`);
              }}>
              <span className='text-sm sm:text-lg'>
                {product.title}
              </span>
            </li>
          ))}
        </ul>
      )}
      <h2 className="text-2xl mb-4">Products</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product: Product) => (
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
