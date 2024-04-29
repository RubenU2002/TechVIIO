import React from 'react';

const RoomIdeas = ({ products }) => {
  // Filtrar los productos de Apple (o cualquier otra categoría)
  const appleProducts = products.filter(product => product.brand === 'Apple');

  return (
    <div className="my-2">
      <div className="flex overflow-x-auto space-x-4">
        {appleProducts.map((product) => (
          <div key={product.id} className="min-w-[480px] bg-white shadow-md rounded-lg p-2">
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

export default RoomIdeas;
