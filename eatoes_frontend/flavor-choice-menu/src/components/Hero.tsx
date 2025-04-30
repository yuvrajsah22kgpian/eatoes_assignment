
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-restaurant-dark text-white py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
          Exquisite Cuisine, <span className="text-restaurant-secondary">Exceptional Experience</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
          Browse our menu and select your favorite dishes for a perfect dining experience.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-white py-3 px-6 rounded-md font-medium">
            Our Menu
          </button>
          <button className="border border-restaurant-secondary text-restaurant-secondary hover:bg-restaurant-secondary/10 py-3 px-6 rounded-md font-medium">
            Make a Reservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
