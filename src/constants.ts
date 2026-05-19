import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'BODWÉ SIGNATURE HOODIE',
    description: 'Ultra-soft heavyweight fleece hoodie with 3D embossed logo. Designed for the urban elite.',
    price: 280,
    category: 'Hoodies',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Jet Black', 'Pure White', 'Golden Ochre'],
    stock: 50,
    isNew: true
  },
  {
    id: '2',
    name: 'NOISE-MAKER STREET TEE',
    description: 'Premium cotton oversized tee with bold typography inspired by underground graffiti culture.',
    price: 180,
    category: 'T-Shirts',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Washed Black', 'Graphic White'],
    stock: 120
  },
  {
    id: '3',
    name: 'CUSTOM "MODULAR" VEST',
    description: 'Utility-focused custom wear vest with detachable pockets and premium gold accents.',
    price: 500,
    category: 'Custom Wear',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800'],
    sizes: ['Adjustable'],
    colors: ['Stealth Black'],
    stock: 15,
    isNew: true
  },
  {
    id: '4',
    name: 'GOLDEN AGE ZIP HOODIE',
    description: 'Premium zip hoodie with gold stitch detail and relaxed silhouette.',
    price: 280,
    category: 'Hoodies',
    images: ['https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey'],
    stock: 30
  }
];

export const CATEGORIES = ['Hoodies', 'T-Shirts', 'Custom Wear'];
