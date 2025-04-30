
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { History, PackageCheck } from 'lucide-react';
import { Transaction } from '@/types/transaction';
import { useCart } from '@/context/CartContext';
import { Badge } from "@/components/ui/badge";

const resolveOrder = (order: any): Transaction => {
  const productDetails = order.order_details
  for (let i in productDetails){
    const product = productDetails[i]
    const product_name = 
  }
}

const TransactionHistory: React.FC = () => {
  const { orders } = useCart();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentOrders, setCurrentOrders] = useState<any[]>([])
  
  
  // Use useEffect to convert orders to transactions format
  useEffect(() => {
    const uid = localStorage.getItem("uid")
    fetch("http://localhost:3000/api/orders/get_order_history/" + uid, {
      method: 'GET'
    }).then(r => r.json()).then((data: any[]) => {
      setCurrentOrders(data)
    })
    if (orders.length > 0) {
      const convertedTransactions: Transaction[] = orders.map(order => ({
        id: order.id,
        date: order.date,
        items: order.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: order.total
      }));
      
      setTransactions([...convertedTransactions]);
    }
  }, [orders]);

  return (
    <div className="container py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-2">
            <History className="h-6 w-6" />
            Transaction History
          </CardTitle>
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            {transactions.length} Orders
          </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {transaction.items.map((item, index) => (
                      <div key={index}>
                        {item.quantity}x {item.name} (${item.price.toFixed(2)})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-right font-medium">${transaction.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1 justify-center">
                      <PackageCheck size={14} /> Completed
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
