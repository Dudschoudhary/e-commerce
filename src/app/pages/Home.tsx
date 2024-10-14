import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/ecommerce/ecommerceSlice';
import { AppDispatch, RootState } from '../store';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch : AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state : RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts)
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Products</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} className="w-full h-48 objec-fit mb-2" />
              <h3 className="font-semibold">{product.title}</h3>
              <p>${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
