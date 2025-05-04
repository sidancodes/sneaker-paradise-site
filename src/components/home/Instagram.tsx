import { Instagram } from 'lucide-react';

const InstagramSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Follow Us On Instagram</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community and stay updated with the latest releases. 
            Tag us in your photos for a chance to be featured!
          </p>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-700 font-medium mt-4 hover:text-blue-900 transition-colors"
          >
            <Instagram size={20} className="mr-2" />
            @sneakerparadise
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post, index) => (
            <div 
              key={index} 
              className="aspect-square overflow-hidden rounded-lg relative group"
            >
              <img
                src={post.imageUrl}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram size={32} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const instagramPosts = [
  {
    imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
  },
  {
    imageUrl: 'https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg',
  },
  {
    imageUrl: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
  },
  {
    imageUrl: 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg',
  },
];

export default InstagramSection;