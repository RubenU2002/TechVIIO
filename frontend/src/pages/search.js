import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import Navigationbar from './navbar';
import ProductCard from './productCard';
import RecommendedForYou from './recommendedForYou';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:5000/products', {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });
            setProducts(response.data.products); // Actualiza el estado con los productos obtenidos
          } catch (error) {
            setError(error);
          } finally {
            setIsLoading(false); // Asegura que la señal de carga se desactive
          }
        };
    
        fetchProducts();
      }, []);

      const handleSearch = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/search?name=${searchTerm}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.data && Array.isArray(response.data)) {
            setSearchedProducts(response.data); // Make sure response.data is an array
          } else {
            setSearchedProducts([]); // Set to an empty array if data is not valid
          }
        } catch (error) {
          setError(error.toString());
        } finally {
          setIsLoading(false);
        }
      };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white border-b-2 z-50">
        <div className="flex justify-center items-center py-2">
          <h1 className="text-xl font-bold">MAYNOOTH</h1>
        </div>
      </div>
      <div className="flex flex-col min-h-screen items-center justify-center pb-11  pt-12" style={{ maxWidth: '95%', margin: '0 auto' }}>
      <div className="search-header relative w-full">
        <input
            type="text"
            placeholder="Search for products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-16 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-black-500"
        />
            <button
                onClick={handleSearch}
                className="absolute right-0 top-0 mt-2 mr-2 px-4 py-2 bg-black text-white rounded-md hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-opacity-50"
            >
                <AiOutlineSearch />
            </button>
        </div>
        
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="results grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 items-center justify-center ">
            {Array.isArray(searchedProducts) && searchedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>

        {/* Productos Recomendados */}
        <div className="text-lg font-bold pl-2 mt-2 w-full text-center">
          <h2>Recommended For You</h2>
        </div>
        <div className="flex justify-center w-full">
          <RecommendedForYou products={products}  quantity={16}/>
        </div>
        
      </div>
      {/* Barra de navegación inferior */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-2">
        <Navigationbar />
      </div>
    </>
  );
};

export default SearchPage;
