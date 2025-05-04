import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';

const ProductsPage = () => {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  
  // Get unique categories and brands
  const categories = Array.from(new Set(products.map(p => p.category)));
  const brands = Array.from(new Set(products.map(p => p.brand)));
  
  // Get max price from products
  const maxPrice = Math.max(...products.map(p => p.price), 300);
  
  useEffect(() => {
    const category = searchParams.get('category');
    if (category === 'featured') {
      setSelectedCategory('');
      setFilteredProducts(products.filter(p => p.featured));
    } else if (category === 'new') {
      setSelectedCategory('');
      setFilteredProducts(products.filter(p => p.newArrival));
    } else if (category) {
      setSelectedCategory(category);
      setFilteredProducts(products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, products]);

  const applyFilters = () => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Apply brand filter
    if (selectedBrand) {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }
    
    // Apply price range filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, maxPrice]);
    setSearchTerm('');
    setFilteredProducts(products);
  };

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedBrand, priceRange, searchTerm]);

  // Get the title based on active filters
  const getTitle = () => {
    if (searchParams.get('category') === 'featured') {
      return 'Featured Sneakers';
    } else if (searchParams.get('category') === 'new') {
      return 'New Arrivals';
    } else if (selectedCategory) {
      return `${selectedCategory} Sneakers`;
    } else {
      return 'All Sneakers';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">{getTitle()}</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input 
                type="text"
                placeholder="Search sneakers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
          </div>
        </div>
        
        {/* Filters Section */}
        {showFilters && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="px-2">
                  <input 
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-2"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Active Filters */}
        {(selectedCategory || selectedBrand || searchTerm || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory && (
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Category: {selectedCategory}
                <button 
                  onClick={() => setSelectedCategory('')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {selectedBrand && (
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Brand: {selectedBrand}
                <button 
                  onClick={() => setSelectedBrand('')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {searchTerm && (
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Search: {searchTerm}
                <button 
                  onClick={() => setSearchTerm('')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Price: ${priceRange[0]} - ${priceRange[1]}
                <button 
                  onClick={() => setPriceRange([0, maxPrice])}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            <button
              onClick={resetFilters}
              className="text-blue-700 hover:text-blue-900 text-sm font-medium"
            >
              Clear All
            </button>
          </div>
        )}
        
        {/* Products Grid */}
        <ProductGrid products={filteredProducts} columns={3} />
      </div>
    </Layout>
  );
};

export default ProductsPage;