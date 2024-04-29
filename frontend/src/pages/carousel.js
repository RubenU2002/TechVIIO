import React from 'react';

const ProductsCarousel = ({ products }) => {
    return (
      <div className="mx-auto snap-x snap-mandatory">
        <div className="flex space-x-4 p-4">
          {products.map((product) => (
            <div key={product.id} className="flex-none w-40 h-40 snap-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Añadir más detalles si es necesario */}
            </div>
          ))}
        </div>
      </div>
    );
};

export default ProductsCarousel;
