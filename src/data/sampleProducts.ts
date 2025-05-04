import { Product } from '../types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Air Cloud 90',
    brand: 'SkyWalk',
    price: 129.99,
    description: 'The Air Cloud 90 offers exceptional comfort with its innovative air cushioning system. Perfect for everyday wear or athletic activities.',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg'
    ],
    category: 'Running',
    featured: true,
    newArrival: false,
    availableSizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ['Blue', 'Black', 'White'],
    createdAt: '2025-01-15T12:00:00Z'
  },
  {
    id: '2',
    name: 'Urban Stride Pro',
    brand: 'StreetEdge',
    price: 149.99,
    description: 'The Urban Stride Pro combines street style with athletic performance. These sneakers feature a reinforced heel for stability and a lightweight design.',
    images: [
      'https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
    ],
    category: 'Casual',
    featured: true,
    newArrival: true,
    availableSizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Gray', 'Black', 'Red'],
    createdAt: '2025-02-10T12:00:00Z'
  },
  {
    id: '3',
    name: 'Horizon Boost',
    brand: 'PeakPerformance',
    price: 179.99,
    description: 'Horizon Boost takes your athletic performance to new heights with responsive cushioning and breathable mesh upper. Ideal for serious runners.',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg',
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg'
    ],
    category: 'Running',
    featured: false,
    newArrival: true,
    availableSizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5],
    colors: ['Blue', 'Orange', 'White'],
    createdAt: '2025-02-18T12:00:00Z'
  },
  {
    id: '4',
    name: 'Court Classic',
    brand: 'Urban Legends',
    price: 99.99,
    description: 'The Court Classic is a timeless design that never goes out of style. With premium materials and attention to detail, these sneakers offer both comfort and durability.',
    images: [
      'https://images.pexels.com/photos/1895019/pexels-photo-1895019.jpeg',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg'
    ],
    category: 'Casual',
    featured: true,
    newArrival: false,
    availableSizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ['White', 'Black', 'Navy'],
    createdAt: '2025-01-05T12:00:00Z'
  },
  {
    id: '5',
    name: 'Trail Blazer X',
    brand: 'WildPath',
    price: 169.99,
    description: 'The Trail Blazer X is designed for off-road adventures with its rugged outsole and water-resistant upper. Conquer any terrain with confidence.',
    images: [
      'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg',
      'https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg'
    ],
    category: 'Hiking',
    featured: false,
    newArrival: true,
    availableSizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Green', 'Brown', 'Black'],
    createdAt: '2025-02-25T12:00:00Z'
  },
  {
    id: '6',
    name: 'Velocity Elite',
    brand: 'SpeedForce',
    price: 199.99,
    description: 'The Velocity Elite is engineered for speed with its ultra-lightweight construction and responsive cushioning. Break your personal records with these high-performance sneakers.',
    images: [
      'https://images.pexels.com/photos/2421374/pexels-photo-2421374.jpeg',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg'
    ],
    category: 'Running',
    featured: true,
    newArrival: false,
    availableSizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ['Blue', 'Yellow', 'Black'],
    createdAt: '2025-01-20T12:00:00Z'
  }
];