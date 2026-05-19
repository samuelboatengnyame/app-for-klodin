export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Hoodies' | 'T-Shirts' | 'Custom Wear';
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  isNew?: boolean;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  email: string;
  photoURL?: string;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
