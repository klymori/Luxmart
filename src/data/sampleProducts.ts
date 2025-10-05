import { Product } from '../types'

export const sampleProducts: Product[] = [
  {
    id: '1',
    title: {
      ru: 'iPhone 15 Pro Max',
      en: 'iPhone 15 Pro Max',
      kg: 'iPhone 15 Pro Max'
    },
    description: {
      ru: 'Новейший iPhone с титановым корпусом и камерой 48 МП',
      en: 'Latest iPhone with titanium body and 48MP camera',
      kg: 'Эң акыркы iPhone титан корпусу жана 48 МП камера менен'
    },
    price: 89999,
    oldPrice: 99999,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    categories: ['electronics', 'smartphones'],
    attributes: {
      brand: 'Apple',
      model: 'iPhone 15 Pro Max',
      storage: '256GB',
      color: 'Titanium Natural'
    },
    stock: 15,
    rating: 4.8,
    reviewsCount: 234,
    isNew: true,
    isOnSale: true,
    isFeatured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: {
      ru: 'Samsung Galaxy S24 Ultra',
      en: 'Samsung Galaxy S24 Ultra',
      kg: 'Samsung Galaxy S24 Ultra'
    },
    description: {
      ru: 'Флагманский смартфон Samsung с S Pen и камерой 200 МП',
      en: 'Samsung flagship smartphone with S Pen and 200MP camera',
      kg: 'Samsung флагмандык смартфони S Pen жана 200 МП камера менен'
    },
    price: 79999,
    oldPrice: 89999,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    categories: ['electronics', 'smartphones'],
    attributes: {
      brand: 'Samsung',
      model: 'Galaxy S24 Ultra',
      storage: '512GB',
      color: 'Titanium Black'
    },
    stock: 12,
    rating: 4.7,
    reviewsCount: 189,
    isNew: true,
    isOnSale: false,
    isFeatured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: {
      ru: 'MacBook Pro 16" M3 Max',
      en: 'MacBook Pro 16" M3 Max',
      kg: 'MacBook Pro 16" M3 Max'
    },
    description: {
      ru: 'Мощный ноутбук для профессионалов с чипом M3 Max',
      en: 'Powerful laptop for professionals with M3 Max chip',
      kg: 'Күчтүү ноутбук профессионалдар үчүн M3 Max чип менен'
    },
    price: 249999,
    oldPrice: 279999,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    categories: ['electronics', 'laptops'],
    attributes: {
      brand: 'Apple',
      model: 'MacBook Pro 16',
      processor: 'M3 Max',
      ram: '32GB',
      storage: '1TB SSD'
    },
    stock: 8,
    rating: 4.9,
    reviewsCount: 156,
    isNew: true,
    isOnSale: true,
    isFeatured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    title: {
      ru: 'Sony WH-1000XM5',
      en: 'Sony WH-1000XM5',
      kg: 'Sony WH-1000XM5'
    },
    description: {
      ru: 'Беспроводные наушники с активным шумоподавлением',
      en: 'Wireless headphones with active noise cancellation',
      kg: 'Беспроводные наушниктар активдүү шум басуу менен'
    },
    price: 29999,
    oldPrice: 34999,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    categories: ['electronics', 'audio'],
    attributes: {
      brand: 'Sony',
      type: 'Over-ear',
      connectivity: 'Bluetooth 5.2',
      battery: '30 hours'
    },
    stock: 25,
    rating: 4.6,
    reviewsCount: 312,
    isNew: false,
    isOnSale: true,
    isFeatured: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    title: {
      ru: 'Nike Air Max 270',
      en: 'Nike Air Max 270',
      kg: 'Nike Air Max 270'
    },
    description: {
      ru: 'Спортивные кроссовки с технологией Air Max',
      en: 'Sports sneakers with Air Max technology',
      kg: 'Спорт кроссовкалары Air Max технологиясы менен'
    },
    price: 12999,
    oldPrice: 15999,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    categories: ['clothing', 'shoes'],
    attributes: {
      brand: 'Nike',
      type: 'Sneakers',
      size: '36-46',
      color: 'White/Black'
    },
    stock: 45,
    rating: 4.4,
    reviewsCount: 567,
    isNew: false,
    isOnSale: true,
    isFeatured: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]
