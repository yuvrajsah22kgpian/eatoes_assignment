
import { MenuItem } from '@/data/menuData';

export interface CartItem extends MenuItem {
  quantity: number;
}

export type OrderStatus = 'pending' | 'completed' | 'cancelled';

export interface Order {
  id: number;
  items: CartItem[];
  status: OrderStatus;
  date: Date;
  total: number;
}
