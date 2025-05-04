export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  featured: boolean;
  newArrival: boolean;
  availableSizes: number[];
  colors: string[];
  createdAt: string;
}

export interface Admin {
  username: string;
  password: string;
}

export interface CartItem {
  product: Product;
  selectedSize: number;
  quantity: number;
}