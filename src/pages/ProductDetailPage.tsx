import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductDetail from '../components/products/ProductDetail';
import ProductGrid from '../components/products/ProductGrid';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    
    // Simulate a network request
    setLoading(true);
    
    setTimeout(() => {
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Find related products from the same category
        const related = products
          .filter(p => 
            p.id !== foundProduct.id && 
            (p.category === foundProduct.category || p.brand === foundProduct.brand)
          )
          .slice(0, 4);
        
        setRelatedProducts(related);
      } else {
        // Product not found, redirect to products page
        navigate('/products');
      }
      
      setLoading(false);
    }, 500);
  }, [id, getProductById, products, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 pt-24 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-4 border-blue-700 border-t-transparent animate-spin mb-4"></div>
            <p className="text-gray-500">Loading product details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 pt-24 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
          >
            Browse Products
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24">
        <ProductDetail product={product} />
        
        {relatedProducts.length > 0 && (
          <div className="py-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-8">You Might Also Like</h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;