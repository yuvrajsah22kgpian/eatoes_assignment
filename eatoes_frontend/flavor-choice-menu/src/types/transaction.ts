
export interface Transaction {
  id: number;
  date: Date;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}
