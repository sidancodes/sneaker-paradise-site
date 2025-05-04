import { useState, useEffect } from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  columns?: number;
}

const ProductGrid = ({ 
  products, 
  title, 
  columns = 3 
}: ProductGridProps) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Animate products appearing with a slight delay between each
    const timer = setTimeout(() => {
      setVisibleProducts(products);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [products]);

  const getGridColumns = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-medium text-gray-900 mb-6">{title}</h2>
      )}
      
      <div className={`grid ${getGridColumns()} gap-6`}>
        {visibleProducts.map((product, index) => (
          <div 
            key={product.id}
            className="opacity-0 animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {visibleProducts.length === 0 && products.length > 0 && (
        <div className="flex justify-center py-12">
          <div className="animate-pulse">
            <div className="w-12 h-12 rounded-full border-4 border-blue-700 border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}
      
      {products.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;