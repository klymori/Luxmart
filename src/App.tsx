import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import Layout from './components/Layout'
import LoadingSpinner from './components/ui/LoadingSpinner'

// Pages
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import WishlistPage from './pages/WishlistPage'
import SearchPage from './pages/SearchPage'
import ProfilePage from './pages/ProfilePage'
import OrdersPage from './pages/OrdersPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminBanners from './pages/admin/AdminBanners'
import AboutPage from './pages/AboutPage'
import TeamPage from './pages/TeamPage'
import ContactsPage from './pages/ContactsPage'
import GalleryPage from './pages/GalleryPage'
import FAQPage from './pages/FAQPage'
import LegalPage from './pages/LegalPage'
import B2BPage from './pages/B2BPage'
import PickupPointsPage from './pages/PickupPointsPage'
import BookingPage from './pages/BookingPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="catalog/:category" element={<CatalogPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="legal" element={<LegalPage />} />
            <Route path="b2b" element={<B2BPage />} />
            <Route path="pickup-points" element={<PickupPointsPage />} />
            <Route path="booking" element={<BookingPage />} />
            
            {/* Admin routes */}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/orders" element={<AdminOrders />} />
            <Route path="admin/banners" element={<AdminBanners />} />
            
            {/* 404 Not Found - Must be last */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
