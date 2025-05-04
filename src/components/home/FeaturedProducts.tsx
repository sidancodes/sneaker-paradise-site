import { useProducts } from '../../context/ProductContext';
import ProductGrid from '../products/ProductGrid';

const FeaturedProducts = () => {
  const { featuredProducts } = useProducts();

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premier sneakers, chosen for their exceptional
            style, comfort, and quality.
          </p>
        </div>
        
        <ProductGrid products={featuredProducts} columns={3} />
      </div>
    </section>
  );
};

export default FeaturedProducts;