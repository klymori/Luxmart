import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import { BarChart3, Package, ShoppingCart, Users, TrendingUp, DollarSign } from 'lucide-react'

const AdminDashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Доступ запрещен
          </h2>
          <p className="text-gray-600">
            У вас нет прав для доступа к админ-панели
          </p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Общая выручка',
      value: '2,450,000 сом',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Заказы',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Товары',
      value: '5,678',
      change: '+15.3%',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Пользователи',
      value: '12,345',
      change: '+23.1%',
      icon: Users,
      color: 'text-orange-600'
    }
  ]

  const recentOrders = [
    { id: 'ORD-001', customer: 'Айбек Токтогулов', amount: '15,000 сом', status: 'В обработке' },
    { id: 'ORD-002', customer: 'Айнура Асанова', amount: '8,500 сом', status: 'Отправлен' },
    { id: 'ORD-003', customer: 'Эрлан Беков', amount: '22,000 сом', status: 'Доставлен' },
    { id: 'ORD-004', customer: 'Жылдыз Кыдырова', amount: '5,200 сом', status: 'Новый' }
  ]

  const topProducts = [
    { name: 'iPhone 15 Pro', sales: 45, revenue: '675,000 сом' },
    { name: 'MacBook Air M2', sales: 32, revenue: '480,000 сом' },
    { name: 'Samsung Galaxy S24', sales: 28, revenue: '420,000 сом' },
    { name: 'iPad Pro', sales: 25, revenue: '375,000 сом' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Панель управления
        </h1>
        <p className="text-gray-600">
          Добро пожаловать в админ-панель Luxmart
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Последние заказы</h2>
            <a href="/admin/orders" className="text-primary-600 hover:text-primary-700 text-sm">
              Посмотреть все
            </a>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{order.amount}</p>
                  <p className="text-sm text-gray-600">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Топ товары</h2>
            <a href="/admin/products" className="text-primary-600 hover:text-primary-700 text-sm">
              Управление
            </a>
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} продаж</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/products"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Package className="w-5 h-5 text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">Управление товарами</p>
              <p className="text-sm text-gray-600">Добавить, изменить, удалить</p>
            </div>
          </a>
          
          <a
            href="/admin/orders"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">Управление заказами</p>
              <p className="text-sm text-gray-600">Просмотр и обработка</p>
            </div>
          </a>
          
          <a
            href="/admin/banners"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="w-5 h-5 text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">Управление баннерами</p>
              <p className="text-sm text-gray-600">Настройка рекламы</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
