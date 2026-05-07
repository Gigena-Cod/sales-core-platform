import React, { useState } from 'react';
import FilterBar from './components/FilterBar.jsx';
import ProductList from './components/ProductList.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import { useCart } from './hooks/useCart.js';
import './App.css';

function App() {
  const [filters, setFilters] = useState({});
  const {
    cart,
    isOpen: isCartOpen,
    setIsOpen: setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getTotalItems,
    isInCart,
    getItemQuantity,
  } = useCart();

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Sales Core Platform
              </h1>
            </div>
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                <path
                  fillRule="evenodd"
                  d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  clipRule="evenodd"
                />
              </svg>
              
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <FilterBar filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filters.search 
              ? `Resultados para "${filters.search}"`
              : 'Todos los productos'
            }
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Explora nuestro catálogo de productos tecnológicos
          </p>
        </div>

        <ProductList
          filters={filters}
          onAddToCart={addToCart}
          isInCart={isInCart}
          getItemQuantity={getItemQuantity}
        />
      </main>

      {/* Shopping Cart */}
      <ShoppingCart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        getTotal={getTotal}
        getTotalItems={getTotalItems}
      />
    </div>
  );
}

export default App;
