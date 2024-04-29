import React from 'react';
import { AiOutlineHeart } from "react-icons/ai";

const RecommendedForYou = ({ products, quantity=8 }) => {
  // Obtiene hasta cuatro productos aleatorios del array de productos
  const shuffledProducts = products.sort(() => 0.5 - Math.random());
  const recommendedProducts = shuffledProducts.slice(0, quantity);

  return (
    <div className="my-4">
      <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        2xl:grid-cols-8
        gap-4">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="relative bg-white shadow-md rounded-lg p-2">
            <button className="absolute top-0 right-0 p-2 text-black leading-none text-xs w-8 h-8 flex items-center justify-center transform -translate-y-2 translate-x-2">
              <AiOutlineHeart />
            </button>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="mt-2 text-center">
              <h3 className="text-sm font-medium">{product.title}</h3>
              <p className="text-xs text-gray-600">Rp. {product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedForYou;
