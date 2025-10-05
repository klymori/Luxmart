// User types
export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  avatar?: string
  phone?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Product types
export interface Product {
  id: string
  title: {
    ru: string
    en: string
    kg: string
  }
  description: {
    ru: string
    en: string
    kg: string
  }
  price: number
  oldPrice?: number
  stock: number
  images: string[]
  categories: string[]
  attributes: Record<string, any>
  rating: number
  reviewsCount: number
  isFeatured: boolean
  isNew: boolean
  isOnSale: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: {
    ru: string
    en: string
    kg: string
  }
  parentId?: string
  image?: string
  slug: string
}

// Cart types
export interface CartItem {
  product: Product
  quantity: number
  selectedAttributes?: Record<string, string>
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

// Order types
export interface OrderItem {
  productId: string
  product: Product
  quantity: number
  price: number
  selectedAttributes?: Record<string, string>
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  address: Address
  paymentInfo: PaymentInfo
  pickupPointId?: string
  trackingNumber?: string
  createdAt: string
  updatedAt: string
}

export interface Address {
  street: string
  city: string
  postalCode: string
  country: string
  apartment?: string
  floor?: string
  entrance?: string
}

export interface PaymentInfo {
  method: 'card' | 'cash' | 'installment'
  installmentPlan?: {
    months: number
    monthlyPayment: number
    totalInterest: number
  }
}

// Review types
export interface Review {
  id: string
  productId: string
  userId: string
  user: User
  rating: number
  text: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
}

// Banner types
export interface Banner {
  id: string
  imageUrl: string
  link?: string
  title?: string
  description?: string
  order: number
  active: boolean
  createdAt: string
}

// Pickup point types
export interface PickupPoint {
  id: string
  title: string
  address: string
  lat: number
  lng: number
  workingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  phone?: string
  email?: string
  isActive: boolean
}

// Installment types
export interface Installment {
  id: string
  productId: string
  terms: {
    minAmount: number
    maxAmount: number
    minMonths: number
    maxMonths: number
    interestRate: number
  }
}

// UI types
export interface UIState {
  modals: {
    [key: string]: boolean
  }
  notifications: Notification[]
  sidebarOpen: boolean
  theme: 'light' | 'dark'
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

// Admin types
export interface AdminStats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  recentOrders: Order[]
  topProducts: Array<{
    product: Product
    sales: number
  }>
}

// Search and filter types
export interface SearchFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  brand?: string
  rating?: number
  inStock?: boolean
  sortBy?: 'price' | 'rating' | 'newest' | 'popularity'
  sortOrder?: 'asc' | 'desc'
}

export interface SearchParams {
  query?: string
  filters?: SearchFilters
  page?: number
  limit?: number
}

// API response types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface CheckoutForm {
  address: Address
  deliveryMethod: 'pickup' | 'courier'
  paymentMethod: 'card' | 'cash' | 'installment'
  pickupPointId?: string
  installmentPlan?: {
    months: number
  }
  promoCode?: string
  notes?: string
}
