import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { sampleProducts } from '../data/sampleProducts';

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  newArrivals: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setProducts(sampleProducts);
  }, []);

  const featuredProducts = products.filter(product => product.featured);
  const newArrivals = products.filter(product => product.newArrival);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, { ...product, id: crypto.randomUUID() }]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      featuredProducts,
      newArrivals,
      addProduct, 
      updateProduct, 
      deleteProduct,
      getProductById
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};