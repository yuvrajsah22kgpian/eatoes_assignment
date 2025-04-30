
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuCategory, categoryInfo } from '@/data/menuData';

interface MenuCategoryTabsProps {
  activeCategory: MenuCategory;
  onCategoryChange: (category: MenuCategory) => void;
}

const MenuCategoryTabs: React.FC<MenuCategoryTabsProps> = ({ 
  activeCategory,
  onCategoryChange
}) => {
  return (
    <Tabs value={activeCategory} onValueChange={(value) => onCategoryChange(value as MenuCategory)} className="w-full">
      <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full bg-restaurant-light mb-6">
        {Object.values(categoryInfo).map(category => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="data-[state=active]:bg-restaurant-primary data-[state=active]:text-white py-3"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default MenuCategoryTabs;
