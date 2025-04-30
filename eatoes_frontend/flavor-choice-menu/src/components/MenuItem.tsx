
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MenuItem as MenuItemType } from '@/data/menuData';
import PlaceholderImage from '@/components/PlaceholderImage';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { Tag } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addItem, items } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  
  const isInStock = item.inStock !== false; // default to true if not specified

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative">
        <PlaceholderImage text={item.name} />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {item.popular && (
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 mb-1 flex items-center gap-1">
              <Tag size={12} /> Popular
            </Badge>
          )}
          {item.newArrival && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-1 flex items-center gap-1">
              <Tag size={12} /> New Arrival
            </Badge>
          )}
          {!isInStock && (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center gap-1">
              <Tag size={12} /> Out of Stock
            </Badge>
          )}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-xl text-restaurant-dark">{item.name}</CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="font-semibold text-lg text-restaurant-primary">
          ${item.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => addItem(item)}
          className="bg-restaurant-primary text-white hover:bg-restaurant-primary/90 w-full"
          disabled={!isInStock}
        >
          {!isInStock ? 'Out of Stock' : cartItem ? `Add Another (${cartItem.quantity})` : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
