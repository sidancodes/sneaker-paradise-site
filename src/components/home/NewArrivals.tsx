import { useProducts } from '../../context/ProductContext';
import ProductGrid from '../products/ProductGrid';

const NewArrivals = () => {
  const { newArrivals } = useProducts();

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">New Arrivals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Be the first to explore our latest additions, featuring cutting-edge designs
            and the freshest styles to keep you ahead of the curve.
          </p>
        </div>
        
        <ProductGrid products={newArrivals} columns={4} />
      </div>
    </section>
  );
};

export default NewArrivals;