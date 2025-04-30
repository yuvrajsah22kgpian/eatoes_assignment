
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash2, Plus, Minus, PackageCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const CartDetails: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, completeOrder, orderStatus } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    completeOrder();
    navigate('/transactions');
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="text-muted-foreground text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
          <p className="mb-6">Add items to your cart to get started</p>
          <Button onClick={() => navigate('/')} className="bg-restaurant-primary hover:bg-restaurant-primary/90">
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Cart</h2>
        <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50 px-3 py-1">
          Status: {orderStatus === 'pending' ? 'Pending' : 'Completed'}
        </Badge>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Item</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Total</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {item.description}
                    </div>
                    <div className="flex gap-1 mt-1">
                      {item.popular && (
                        <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50 text-xs">
                          Popular
                        </Badge>
                      )}
                      {item.newArrival && (
                        <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50 text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="border-t pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Order Summary</h3>
          <div className="text-2xl font-bold text-restaurant-primary">${totalPrice.toFixed(2)}</div>
        </div>
        
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
            onClick={handleCheckout}
          >
            <PackageCheck className="h-4 w-4" />
            Order Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
