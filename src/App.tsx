import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import ProductDetails from './pages/ProductDetails';
import SplashScreen from './components/SplashScreen';
import Auth from './pages/Auth';

export default function App() {
  return (
    <BrowserRouter>
      <SplashScreen />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="profile" element={<Profile />} />
          <Route path="product/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
