import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewArrivals from '../components/home/NewArrivals';
import InstagramSection from '../components/home/Instagram';
import Layout from '../components/layout/Layout';

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      <NewArrivals />
      <InstagramSection />
    </Layout>
  );
};

export default HomePage;