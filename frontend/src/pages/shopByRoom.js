import React from 'react';

const ShopByRoom = ({ products }) => {
  // Crear un objeto único por marcas
  const brands = [...new Set(products.map(product => product.brand))];

  return (
    <div className="my-2">
      <div className="flex overflow-x-auto space-x-4">
        {brands.map((brand) => {
          // Encuentra el primer producto de esta marca
          const product = products.find(product => product.brand === brand);
          return (
            <div key={brand} className="min-w-[120px] bg-white shadow-md rounded-lg p-2">
              <img
                src={product.thumbnail}
                alt={brand}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="mt-2 text-center">
                <h3 className="text-sm font-medium">{brand}</h3>
                {/* Opcional: Mostrar cantidad de productos de esta marca */}
                <p className="text-xs text-gray-600">
                  {products.filter(p => p.brand === brand).length} products
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopByRoom;
