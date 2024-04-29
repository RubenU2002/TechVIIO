import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductsCarousel from './carousel';
import RoomIdeas from './roomIdeas';
import ShopByRoom from './shopByRoom';
import RecommendedForYou from './recommendedForYou';
import Navigationbar from './navbar';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white border-b-2 z-50">
        <div className="flex justify-center items-center py-2">
          <h1 className="text-xl font-bold">MAYNOOTH</h1>
        </div>
      </div>
      <div className="flex flex-col min-h-screen items-center justify-center pb-11  pt-8" style={{ maxWidth: '95%', margin: '0 auto' }}>
        {/* Carrusel de imágenes */}
        <div className="flex overflow-x-scroll py-2 justify-center w-full">
          <ProductsCarousel products={products} />
        </div>

        {/* Room Ideas */}
        <div className="text-lg font-bold pl-2 mt-2 w-full text-center">
          <h2>Apple Products</h2>
        </div>
        <div className="flex overflow-x-scroll justify-center w-full">
          <RoomIdeas products={products} />
        </div>

        {/* Shop By Room */}
        <div className="text-lg font-bold pl-2 mt-2 w-full text-center">
          <h2>Shop By Brand</h2>
        </div>
        <div className="flex overflow-x-scroll justify-center w-full">
          <ShopByRoom products={products} />
        </div>

        {/* Productos Recomendados */}
        <div className="text-lg font-bold pl-2 mt-2 w-full text-center">
          <h2>Recommended For You</h2>
        </div>
        <div className="flex justify-center w-full">
          <RecommendedForYou products={products} />
        </div>
      </div>
      {/* Barra de navegación inferior */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-2">
        <Navigationbar />
      </div>
    </>
  );
};

export default HomePage;
