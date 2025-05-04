import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold flex items-center mb-4">
              <span className="mr-2">👟</span>
              <span>SneakerParadise</span>
            </Link>
            <p className="text-blue-200 mb-6">
              Premium sneakers for every style and occasion. Stay ahead of the curve with our exclusive collection.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" className="hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="mailto:contact@sneakerparadise.com" className="hover:text-blue-300 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/products?category=running" className="text-blue-200 hover:text-white transition-colors">Running</Link></li>
              <li><Link to="/products?category=casual" className="text-blue-200 hover:text-white transition-colors">Casual</Link></li>
              <li><Link to="/products?category=hiking" className="text-blue-200 hover:text-white transition-colors">Hiking</Link></li>
              <li><Link to="/products?category=basketball" className="text-blue-200 hover:text-white transition-colors">Basketball</Link></li>
              <li><Link to="/products" className="text-blue-200 hover:text-white transition-colors">View All</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Information</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-blue-200 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-blue-200 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-blue-200 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/privacy" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
            <p className="text-blue-200 mb-4">Subscribe to get updates on new releases and exclusive offers.</p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l focus:outline-none text-blue-900 w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r font-medium transition-colors mt-2 sm:mt-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-blue-200 text-sm text-center">
          <p>© {new Date().getFullYear()} SneakerParadise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;