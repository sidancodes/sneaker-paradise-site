import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
      {/* Decorative pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px',
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-24 sm:py-32 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left" data-aos="fade-right">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Step Into <span className="text-blue-300">Sneaker</span> Paradise
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-lg mx-auto md:mx-0">
              Discover the ultimate collection of premium sneakers for every style and occasion. From casual classics to performance powerhouses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => navigate('/products')}
                className="px-6 py-3 bg-white text-blue-800 font-medium rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                Shop Now
                <ChevronRight size={20} className="ml-1" />
              </button>
              <button 
                onClick={() => navigate('/products?category=new')}
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                New Arrivals
              </button>
            </div>
          </div>
          
          <div className="relative" data-aos="fade-left">
            <div className="relative z-10 transform rotate-[-8deg] hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" 
                alt="Featured Sneaker" 
                className="rounded-lg shadow-2xl mx-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white px-6 py-2 rounded-full font-bold shadow-lg transform rotate-[8deg]">
                New Collection
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;