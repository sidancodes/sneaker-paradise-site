import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-800 flex items-center">
            <span className="mr-2">👟</span>
            <span>SneakerParadise</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">All Sneakers</NavLink>
            <NavLink to="/products?category=new">New Arrivals</NavLink>
            <NavLink to="/products?category=featured">Featured</NavLink>
          </nav>

          {/* Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className={`p-2 rounded-full transition-colors ${
              isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
            }`}>
              <Search size={20} className={isScrolled ? 'text-blue-800' : 'text-blue-800'} />
            </Link>
            <Link to="/cart" className={`p-2 rounded-full transition-colors ${
              isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
            }`}>
              <ShoppingBag size={20} className={isScrolled ? 'text-blue-800' : 'text-blue-800'} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className={isScrolled ? 'text-blue-800' : 'text-blue-800'} />
            ) : (
              <Menu size={24} className={isScrolled ? 'text-blue-800' : 'text-blue-800'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg">
            <nav className="flex flex-col">
              <MobileNavLink to="/">Home</MobileNavLink>
              <MobileNavLink to="/products">All Sneakers</MobileNavLink>
              <MobileNavLink to="/products?category=new">New Arrivals</MobileNavLink>
              <MobileNavLink to="/products?category=featured">Featured</MobileNavLink>
              <MobileNavLink to="/search">Search</MobileNavLink>
              <MobileNavLink to="/cart">Cart</MobileNavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname + location.search === to;

  return (
    <Link
      to={to}
      className={`text-blue-800 transition-colors ${
        isActive ? 'font-medium' : 'hover:text-blue-600'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname + location.search === to;

  return (
    <Link
      to={to}
      className={`py-3 px-4 border-b border-gray-100 ${
        isActive ? 'bg-blue-50 text-blue-800 font-medium' : 'text-blue-800'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;