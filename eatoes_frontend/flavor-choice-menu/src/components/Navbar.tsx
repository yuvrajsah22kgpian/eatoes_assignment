
import React, { useEffect, useState } from 'react';
import { Search, History, ShoppingBag, LogOut, User } from 'lucide-react';
import CartSheet from './CartSheet';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const { items } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>()
  const [reload, setReload] = useState(false);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("token") !== null)
    const uid = localStorage.getItem("uid")
    if(isAuthenticated && uid){
      fetch("http://localhost:3000/api/users/" + uid, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }).then((res) => {
        console.log(res.body);
        setUser(res.body);
      })
    }
  }, [reload])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <span className="hidden font-bold sm:inline-block">
              Restaurant Name
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground"
              to="/"
            >
              Menu
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground flex items-center gap-2"
              to="/cart"
            >
              <ShoppingBag className="h-4 w-4" />
              Cart
              {itemCount > 0 && (
                <span className="bg-restaurant-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground flex items-center gap-2"
              to="/transactions"
            >
              <History className="h-4 w-4" />
              Transactions
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[300px]"
                placeholder="Search items..."
                type="search"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <div className="mr-2 hidden md:flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span className="text-sm">{user?.name || user?.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    localStorage.removeItem("uid")
                    localStorage.removeItem("token")
                    setReload((r) => !r)
                  }}
                  className="hidden md:flex"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm" className="hidden md:flex">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="default" size="sm" className="hidden md:flex">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
            <CartSheet />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
