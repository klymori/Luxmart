import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../cartSlice'
import { Product } from '../../../types'

const mockProduct: Product = {
  id: '1',
  title: { ru: 'Test Product', en: 'Test Product', kg: 'Test Product' },
  description: { ru: 'Test Description', en: 'Test Description', kg: 'Test Description' },
  price: 1000,
  stock: 10,
  images: ['test.jpg'],
  categories: ['test'],
  attributes: {},
  rating: 5,
  reviewsCount: 0,
  isFeatured: false,
  isNew: false,
  isOnSale: false,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01'
}

describe('cartSlice', () => {
  const initialState = {
    items: [],
    total: 0,
    itemCount: 0
  }

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle addToCart', () => {
    const actual = cartReducer(initialState, addToCart({ product: mockProduct, quantity: 1 }))
    expect(actual.items).toHaveLength(1)
    expect(actual.items[0].product).toEqual(mockProduct)
    expect(actual.items[0].quantity).toBe(1)
    expect(actual.total).toBe(1000)
    expect(actual.itemCount).toBe(1)
  })

  it('should handle removeFromCart', () => {
    const stateWithItem = {
      items: [{ product: mockProduct, quantity: 1 }],
      total: 1000,
      itemCount: 1
    }
    
    const actual = cartReducer(stateWithItem, removeFromCart('1'))
    expect(actual.items).toHaveLength(0)
    expect(actual.total).toBe(0)
    expect(actual.itemCount).toBe(0)
  })

  it('should handle updateQuantity', () => {
    const stateWithItem = {
      items: [{ product: mockProduct, quantity: 1 }],
      total: 1000,
      itemCount: 1
    }
    
    const actual = cartReducer(stateWithItem, updateQuantity({ productId: '1', quantity: 3 }))
    expect(actual.items[0].quantity).toBe(3)
    expect(actual.total).toBe(3000)
    expect(actual.itemCount).toBe(3)
  })

  it('should handle clearCart', () => {
    const stateWithItems = {
      items: [{ product: mockProduct, quantity: 1 }],
      total: 1000,
      itemCount: 1
    }
    
    const actual = cartReducer(stateWithItems, clearCart())
    expect(actual.items).toHaveLength(0)
    expect(actual.total).toBe(0)
    expect(actual.itemCount).toBe(0)
  })
})
