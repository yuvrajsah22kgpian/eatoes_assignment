
import React, { useEffect, useState } from 'react';
import { MenuItem as MenuItemType, MenuCategory, categoryInfo } from '@/data/menuData';
import MenuCategoryTabs from './MenuCategoryTabs';
import MenuItem from './MenuItem';

const resolveItemCategory = (category: String): MenuCategory => {
  switch (category) {
    case "Appetizers":
      return "appetizers"
    case "Main Courses":
      return "main-courses"
    case "Desserts":
      return "desserts"
    case "Drinks":
      return "drinks"
    default:
      break;
  }
}

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('main-courses');
  const [products, setProducts] = useState<any[]>([])
  useEffect(() => {
    fetch("http://localhost:3000/api/products", {
      method: 'GET'
    }).then(r => r.json()).then((data: any[]) => {
      setProducts(data.filter((item) => resolveItemCategory(item.category) === activeCategory))
    })
  }, [activeCategory])
  
  return (
    <div className="container mx-auto px-4 py-8 pb-32">
      <div className="text-center mb-8">
        <h2 className="font-serif font-bold text-2xl md:text-3xl text-restaurant-dark mb-2">
          Our Menu
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our carefully crafted menu of delicious dishes and select your favorites.
        </p>
      </div>
      
      <MenuCategoryTabs 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      <div className="mb-4">
        <h3 className="font-serif text-xl text-restaurant-dark mb-2">
          {categoryInfo[activeCategory].name}
        </h3>
        <p className="text-muted-foreground mb-6">
          {categoryInfo[activeCategory].description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(item => (
          <MenuItem 
            key={item.id} 
            item={item} 
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
