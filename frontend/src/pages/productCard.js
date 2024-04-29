import React from 'react';
import { AiOutlineHeart } from "react-icons/ai";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 m-2">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-40 w-full object-cover rounded-t-lg"
      />
      <div className="flex flex-col items-center">
        <h3 className="mt-2 font-bold">{product.title}</h3>
        <p className="text-gray-600">Rp. {product.price.toLocaleString()}</p>
        <button className="mt-2 rounded-full p-2 text-black font-bold">
            <AiOutlineHeart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
