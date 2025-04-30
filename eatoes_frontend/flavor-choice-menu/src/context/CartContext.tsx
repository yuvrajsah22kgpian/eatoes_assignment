
import React, { createContext, useContext, useState } from 'react';
import { CartItem, Order, OrderStatus } from '@/types/cart';
import { MenuItem } from '@/data/menuData';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  orderStatus: OrderStatus;
  completeOrder: () => void;
  orders: Order[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending');
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const addItem = (item: MenuItem) => {
    if (item.inStock === false) {
      toast({
        title: "Item Out of Stock",
        description: `${item.name} is currently unavailable.`,
        variant: "destructive"
      });
      return;
    }
    
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        return currentItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });
    toast({
      description: `${item.name} added to cart`,
    });
  };

  const removeItem = (itemId: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setOrderStatus('pending');
  };
  
  const completeOrder = () => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add items before completing order.",
        variant: "destructive"
      });
      return;
    }
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: Date.now(),
      items: [...items],
      status: 'completed',
      date: new Date(),
      total
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
    setOrderStatus('completed');
    toast({
      title: "Order Completed",
      description: `Your order #${newOrder.id} has been placed successfully!`,
    });
    clearCart();
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      orderStatus,
      completeOrder,
      orders 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
