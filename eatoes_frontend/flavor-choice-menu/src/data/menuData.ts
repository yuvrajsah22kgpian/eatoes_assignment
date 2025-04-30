
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  popular?: boolean;
  inStock?: boolean;
  newArrival?: boolean;
}

export type MenuCategory = 'appetizers' | 'main-courses' | 'desserts' | 'drinks';

export interface MenuCategoryInfo {
  id: MenuCategory;
  name: string;
  description: string;
}

export const categoryInfo: Record<MenuCategory, MenuCategoryInfo> = {
  'appetizers': {
    id: 'appetizers',
    name: 'Appetizers',
    description: 'Start your meal with our delicious appetizers, perfect for sharing.'
  },
  'main-courses': {
    id: 'main-courses',
    name: 'Main Courses',
    description: 'Our chef\'s signature dishes, prepared with the finest ingredients.'
  },
  'desserts': {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet treats to complete your dining experience.'
  },
  'drinks': {
    id: 'drinks',
    name: 'Drinks',
    description: 'Refresh yourself with our selection of beverages.'
  }
};

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Bruschetta',
    description: 'Grilled bread rubbed with garlic and topped with olive oil, salt, tomatoes, and basil.',
    price: 8.99,
    image: '/appetizer-bruschetta.jpg',
    category: 'appetizers',
    popular: true,
    inStock: true
  },
  {
    id: 2,
    name: 'Spinach Artichoke Dip',
    description: 'Creamy blend of spinach, artichokes, and melted cheeses, served with toasted bread.',
    price: 10.99,
    image: '/appetizer-spinach-dip.jpg',
    category: 'appetizers',
    inStock: true,
    newArrival: true
  },
  {
    id: 3,
    name: 'Calamari',
    description: 'Lightly breaded and fried calamari rings served with marinara sauce.',
    price: 12.99,
    image: '/appetizer-calamari.jpg',
    category: 'appetizers',
    inStock: false
  },
  {
    id: 4,
    name: 'Grilled Salmon',
    description: 'Fresh salmon fillet grilled to perfection with lemon herb butter, served with seasonal vegetables.',
    price: 24.99,
    image: '/main-salmon.jpg',
    category: 'main-courses',
    popular: true,
    inStock: true
  },
  {
    id: 5,
    name: 'Filet Mignon',
    description: '8oz tender beef filet, cooked to your preference, with red wine reduction and garlic mashed potatoes.',
    price: 32.99,
    image: '/main-filet.jpg',
    category: 'main-courses',
    inStock: true
  },
  {
    id: 6,
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms, parmesan cheese, and truffle oil.',
    price: 18.99,
    image: '/main-risotto.jpg',
    category: 'main-courses',
    inStock: true,
    newArrival: true
  },
  {
    id: 7,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    price: 9.99,
    image: '/dessert-chocolate.jpg',
    category: 'desserts',
    popular: true,
    inStock: true
  },
  {
    id: 8,
    name: 'Crème Brûlée',
    description: 'Classic vanilla custard with a caramelized sugar crust.',
    price: 8.99,
    image: '/dessert-creme.jpg',
    category: 'desserts',
    inStock: true
  },
  {
    id: 9,
    name: 'Tiramisu',
    description: 'Traditional Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.',
    price: 8.99,
    image: '/dessert-tiramisu.jpg',
    category: 'desserts',
    inStock: false
  },
  {
    id: 10,
    name: 'Red Wine',
    description: 'House selection of red wine by the glass.',
    price: 8.99,
    image: '/drink-red-wine.jpg',
    category: 'drinks',
    inStock: true
  },
  {
    id: 11,
    name: 'Craft Beer',
    description: 'Local craft beer on tap.',
    price: 6.99,
    image: '/drink-beer.jpg',
    category: 'drinks',
    inStock: true,
    newArrival: true
  },
  {
    id: 12,
    name: 'Sparkling Water',
    description: 'Chilled sparkling water with lemon.',
    price: 3.99,
    image: '/drink-sparkling.jpg',
    category: 'drinks',
    inStock: true
  }
];
