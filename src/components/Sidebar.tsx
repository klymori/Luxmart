import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { setSidebarOpen } from '../features/ui/uiSlice'
import { cn } from '../utils/cn'
import { 
  Home, 
  ShoppingBag, 
  Heart, 
  User, 
  ShoppingCart, 
  Package, 
  Settings,
  BarChart3,
  Users,
  FileText,
  MapPin,
  Image,
  HelpCircle,
  Building,
  Phone,
  Camera,
  Scale,
  Truck
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const isAdmin = user?.role === 'admin'

  const publicLinks = [
    { path: '/', label: 'Главная', icon: Home },
    { path: '/catalog', label: 'Каталог', icon: ShoppingBag },
    { path: '/wishlist', label: 'Избранное', icon: Heart },
    { path: '/cart', label: 'Корзина', icon: ShoppingCart },
    { path: '/orders', label: 'Мои заказы', icon: Package },
    { path: '/profile', label: 'Профиль', icon: User },
  ]

  const adminLinks = [
    { path: '/admin', label: 'Панель управления', icon: BarChart3 },
    { path: '/admin/products', label: 'Товары', icon: Package },
    { path: '/admin/orders', label: 'Заказы', icon: ShoppingCart },
    { path: '/admin/banners', label: 'Баннеры', icon: Image },
    { path: '/admin/users', label: 'Пользователи', icon: Users },
  ]

  const infoLinks = [
    { path: '/about', label: 'О нас', icon: Building },
    { path: '/team', label: 'Команда', icon: Users },
    { path: '/contacts', label: 'Контакты', icon: Phone },
    { path: '/gallery', label: 'Галерея', icon: Camera },
    { path: '/pickup-points', label: 'Пункты выдачи', icon: MapPin },
    { path: '/faq', label: 'FAQ', icon: HelpCircle },
    { path: '/legal', label: 'Правовая информация', icon: FileText },
    { path: '/b2b', label: 'B2B', icon: Building },
  ]

  const handleLinkClick = () => {
    dispatch(setSidebarOpen(false))
  }

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-14 sm:top-16 left-0 z-40 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full overflow-y-auto">
          <nav className="p-4 space-y-2">
            {/* Public Links */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Основное
              </h3>
              {publicLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive(link.path)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Admin Links */}
            {isAdmin && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Администрирование
                </h3>
                {adminLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={handleLinkClick}
                      className={cn(
                        'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActive(link.path)
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Info Links */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Информация
              </h3>
              {infoLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive(link.path)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
