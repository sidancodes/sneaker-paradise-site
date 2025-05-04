import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Instagram, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSizeSelect = (size: number) => {
    setSelectedSize(size);
  };

  const handleInstagramOrder = () => {
    window.open('https://instagram.com/sneakerparadise', '_blank');
  };

  return (
    <div className="py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-blue-800 hover:text-blue-600 transition-colors mb-6"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Products
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="aspect-square mb-4 overflow-hidden rounded-lg">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0 ${
                    currentImageIndex === index ? 'ring-2 ring-blue-600' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={image} alt={`${product.name} - View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <div className="flex flex-col h-full">
            <div className="mb-2">
              {product.newArrival && (
                <span className="inline-block bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded-full mb-2 mr-2">
                  New Arrival
                </span>
              )}
              {product.featured && (
                <span className="inline-block bg-amber-500 text-white px-3 py-1 text-sm font-medium rounded-full mb-2">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
            
            <p className="text-2xl font-medium text-blue-800 mb-6">${product.price.toFixed(2)}</p>
            
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-3">Select Size</h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`py-3 border rounded-md text-center transition-colors ${
                      selectedSize === size 
                        ? 'border-blue-600 bg-blue-50 text-blue-800' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleInstagramOrder}
              disabled={!selectedSize}
              className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-medium mb-6 ${
                selectedSize 
                  ? 'bg-blue-700 hover:bg-blue-800 transition-colors' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <Instagram size={20} />
              Order via Instagram
            </button>
            
            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900"
              >
                <span>Description</span>
                {isDescriptionExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              <div className={`mt-4 text-gray-600 overflow-hidden transition-all duration-300 ${
                isDescriptionExpanded ? 'max-h-96' : 'max-h-20'
              }`}>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;