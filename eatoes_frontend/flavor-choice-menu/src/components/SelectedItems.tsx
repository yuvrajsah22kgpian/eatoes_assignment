import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const SelectedItems: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }
  
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="flex flex-col h-full">
      <ul className="space-y-4 overflow-y-auto flex-1">
        {items.map(item => (
          <li key={item.id} className="flex justify-between items-center py-2 border-b">
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-8 w-8 p-0"
                >
                  <Minus size={16} />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus size={16} />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeItem(item.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <X size={16} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="flex flex-col gap-4 mt-6 pt-6 border-t">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Total</p>
          <p className="text-lg font-bold text-restaurant-primary">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="flex-1"
          >
            Clear All
          </Button>
          <Button 
            className="bg-restaurant-primary hover:bg-restaurant-primary/90 flex-1"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedItems;
