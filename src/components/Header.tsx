import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { toggleSidebar } from '../features/ui/uiSlice'
import { logout } from '../features/auth/authSlice'
import Button from './ui/Button'
import Input from './ui/Input'
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

const Header: React.FC = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const { itemCount } = useAppSelector((state) => state.cart)
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist)
  const { sidebarOpen } = useAppSelector((state) => state.ui)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="w-full px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 w-full max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">L</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">Luxmart</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-2 sm:mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder={t('common.search') + ' ' + t('product.title').toLowerCase() + '...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search */}
            <button className="md:hidden p-1 text-gray-600 hover:text-gray-900">
              <Search className="w-4 h-4" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-1 sm:p-2 text-gray-600 hover:text-gray-900">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-1 sm:p-2 text-gray-600 hover:text-gray-900">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Link to="/profile" className="p-1 sm:p-2 text-gray-600 hover:text-gray-900">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="hidden sm:flex">
                  {t('navigation.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Link to="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm">{t('navigation.login')}</Button>
                </Link>
                <Link to="/register" className="hidden sm:block">
                  <Button size="sm">{t('navigation.register')}</Button>
                </Link>
                <Link to="/login" className="sm:hidden p-1">
                  <User className="w-4 h-4 text-gray-600" />
                </Link>
              </div>
            )}

            {/* Sidebar Toggle */}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-1 sm:p-2 text-gray-600 hover:text-gray-900"
              title={sidebarOpen ? t('common.close') + ' ' + t('navigation.menu') : t('common.open') + ' ' + t('navigation.menu')}
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
