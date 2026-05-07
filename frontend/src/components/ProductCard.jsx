import React from 'react';

const ProductCard = ({ product, onAddToCart, isInCart, getItemQuantity }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  };

  const stockStatus = product.stock > 0 ? 'En stock' : 'Sin stock';
  const stockColor = product.stock > 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative bg-gray-100">
        <img
          src={'/default-product.png'}
          alt={product.nombre}
          className="w-full h-48 object-cover"
          style={{
            backgroundImage: 'url(/default-product.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Featured Badge */}
        {product.destacado && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
            Destacado
          </span>
        )}
        
        {/* Availability Badge */}
        {!product.disponible && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            No disponible
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.nombre}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.desc}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(product.precio)}
          </span>
          <span className={`text-sm font-medium ${stockColor}`}>
            {stockStatus}
          </span>
        </div>

        {/* Category */}
        <div className="mb-4">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
            {product.categoria}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.disponible || product.stock === 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            !product.disponible || product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {isInCart(product.id) ? (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              En carrito ({getItemQuantity(product.id)})
            </span>
          ) : (
            'Agregar al carrito'
          )}
        </button>

        {/* Stock Warning */}
        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-orange-600 text-xs mt-2 text-center">
            ¡Últimas {product.stock} unidades!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
