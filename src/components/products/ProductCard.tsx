import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.newArrival && (
            <span className="bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded">
              New
            </span>
          )}
          {product.featured && (
            <span className="bg-amber-500 text-white px-2 py-1 text-xs font-medium rounded">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
          </div>
          <span className="font-medium text-blue-800">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Quick size guide */}
        <div className="mt-4 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {product.availableSizes.slice(0, 5).map((size) => (
            <span key={size} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
              {size}
            </span>
          ))}
          {product.availableSizes.length > 5 && (
            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
              +{product.availableSizes.length - 5} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;