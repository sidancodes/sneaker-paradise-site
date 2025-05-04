import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Product } from '../../types';

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

const initialProductState: Product = {
  id: '',
  name: '',
  brand: '',
  price: 0,
  description: '',
  images: [''],
  category: '',
  featured: false,
  newArrival: false,
  availableSizes: [7, 8, 9, 10, 11],
  colors: [''],
  createdAt: new Date().toISOString(),
};

const ProductForm = ({ initialProduct, onSubmit, onCancel }: ProductFormProps) => {
  const [product, setProduct] = useState<Product>(initialProduct || initialProductState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setProduct(prev => ({ ...prev, [name]: checkbox.checked }));
    } else if (name === 'price') {
      setProduct(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSizeToggle = (size: number) => {
    setProduct(prev => {
      const sizes = [...prev.availableSizes];
      const index = sizes.indexOf(size);
      
      if (index === -1) {
        sizes.push(size);
        sizes.sort((a, b) => a - b);
      } else {
        sizes.splice(index, 1);
      }
      
      return { ...prev, availableSizes: sizes };
    });
  };

  const addImageField = () => {
    setProduct(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const updateImageUrl = (index: number, url: string) => {
    setProduct(prev => {
      const newImages = [...prev.images];
      newImages[index] = url;
      return { ...prev, images: newImages };
    });
  };

  const removeImageField = (index: number) => {
    if (product.images.length <= 1) return;
    
    setProduct(prev => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const addColorField = () => {
    setProduct(prev => ({ ...prev, colors: [...prev.colors, ''] }));
  };

  const updateColor = (index: number, color: string) => {
    setProduct(prev => {
      const newColors = [...prev.colors];
      newColors[index] = color;
      return { ...prev, colors: newColors };
    });
  };

  const removeColorField = (index: number) => {
    if (product.colors.length <= 1) return;
    
    setProduct(prev => {
      const newColors = [...prev.colors];
      newColors.splice(index, 1);
      return { ...prev, colors: newColors };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!product.name.trim()) newErrors.name = 'Name is required';
    if (!product.brand.trim()) newErrors.brand = 'Brand is required';
    if (product.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!product.description.trim()) newErrors.description = 'Description is required';
    if (!product.category.trim()) newErrors.category = 'Category is required';
    if (product.availableSizes.length === 0) newErrors.sizes = 'Select at least one size';
    
    product.images.forEach((image, index) => {
      if (!image.trim()) {
        newErrors[`image-${index}`] = 'Image URL is required';
      } else if (!isValidUrl(image)) {
        newErrors[`image-${index}`] = 'Invalid URL format';
      }
    });
    
    product.colors.forEach((color, index) => {
      if (!color.trim()) {
        newErrors[`color-${index}`] = 'Color is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Filter out empty values
      const finalProduct = {
        ...product,
        images: product.images.filter(img => img.trim() !== ''),
        colors: product.colors.filter(color => color.trim() !== ''),
      };
      
      onSubmit(finalProduct);
    }
  };

  const sizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13];
  const categories = ['Running', 'Casual', 'Basketball', 'Hiking', 'Skateboarding', 'Training'];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-900">
          {initialProduct ? 'Edit Product' : 'Add New Product'}
        </h2>
        <button 
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Brand*
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className={`w-full border ${errors.brand ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            />
            {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price* ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              value={product.price}
              onChange={handleChange}
              className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className={`w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={product.description}
            onChange={handleChange}
            className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        
        {/* Features */}
        <div className="flex space-x-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={product.featured}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
              Featured Product
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="newArrival"
              name="newArrival"
              checked={product.newArrival}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="newArrival" className="ml-2 text-sm font-medium text-gray-700">
              New Arrival
            </label>
          </div>
        </div>
        
        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Sizes*
          </label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`py-1 px-3 border rounded-md text-center transition-colors ${
                  product.availableSizes.includes(size) 
                    ? 'border-blue-600 bg-blue-50 text-blue-800' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.sizes && <p className="text-red-500 text-xs mt-1">{errors.sizes}</p>}
        </div>
        
        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images*
          </label>
          
          {product.images.map((image, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={image}
                onChange={(e) => updateImageUrl(index, e.target.value)}
                placeholder="Enter image URL"
                className={`flex-grow border ${errors[`image-${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              />
              <button
                type="button"
                onClick={() => removeImageField(index)}
                disabled={product.images.length <= 1}
                className={`p-2 rounded-md ${
                  product.images.length <= 1
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-red-500 hover:bg-red-50'
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          
          {product.images.map((_, index) => (
            errors[`image-${index}`] && (
              <p key={`error-${index}`} className="text-red-500 text-xs mt-1 mb-1">
                {errors[`image-${index}`]}
              </p>
            )
          ))}
          
          <button
            type="button"
            onClick={addImageField}
            className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
          >
            <Plus size={16} className="mr-1" />
            Add Another Image
          </button>
        </div>
        
        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Colors*
          </label>
          
          {product.colors.map((color, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                placeholder="Enter color name (e.g., Blue, Black)"
                className={`flex-grow border ${errors[`color-${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              />
              <button
                type="button"
                onClick={() => removeColorField(index)}
                disabled={product.colors.length <= 1}
                className={`p-2 rounded-md ${
                  product.colors.length <= 1
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-red-500 hover:bg-red-50'
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          
          {product.colors.map((_, index) => (
            errors[`color-${index}`] && (
              <p key={`error-color-${index}`} className="text-red-500 text-xs mt-1 mb-1">
                {errors[`color-${index}`]}
              </p>
            )
          ))}
          
          <button
            type="button"
            onClick={addColorField}
            className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
          >
            <Plus size={16} className="mr-1" />
            Add Another Color
          </button>
        </div>
        
        {/* Submit buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
          >
            {initialProduct ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;