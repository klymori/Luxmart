import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartState, Product } from '../../types'

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  total: 0,
  itemCount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number; selectedAttributes?: Record<string, string> }>) => {
      const { product, quantity = 1, selectedAttributes } = action.payload
      const existingItem = state.items.find(
        item => item.product.id === product.id && 
        JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          product,
          quantity,
          selectedAttributes,
        })
      }

      cartSlice.caseReducers.calculateTotals(state)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload)
      cartSlice.caseReducers.calculateTotals(state)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload
      const item = state.items.find(item => item.product.id === productId)
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.product.id !== productId)
        } else {
          item.quantity = quantity
        }
      }

      cartSlice.caseReducers.calculateTotals(state)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
      localStorage.removeItem('cart')
    },
    calculateTotals: (state) => {
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
      state.total = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    },
    loadCartFromStorage: (state) => {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        state.items = JSON.parse(savedCart)
        cartSlice.caseReducers.calculateTotals(state)
      }
    },
  },
})

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  calculateTotals, 
  loadCartFromStorage 
} = cartSlice.actions

export default cartSlice.reducer
