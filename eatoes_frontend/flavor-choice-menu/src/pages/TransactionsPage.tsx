
import React from 'react';
import Navbar from '@/components/Navbar';
import TransactionHistory from '@/components/TransactionHistory';

const TransactionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <TransactionHistory />
    </div>
  );
};

export default TransactionsPage;
