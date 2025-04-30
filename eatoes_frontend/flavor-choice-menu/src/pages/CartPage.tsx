
import React from 'react';
import Navbar from '@/components/Navbar';
import CartDetails from '@/components/CartDetails';

const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="font-serif font-bold text-2xl md:text-3xl text-restaurant-dark mb-6">
          Your Shopping Cart
        </h2>
        <CartDetails />
      </div>
    </div>
  );
};

export default CartPage;
