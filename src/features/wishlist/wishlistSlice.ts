import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../types'

interface WishlistState {
  items: Product[]
}

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      const exists = state.items.find(item => item.id === product.id)
      
      if (!exists) {
        state.items.push(product)
        localStorage.setItem('wishlist', JSON.stringify(state.items))
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      localStorage.setItem('wishlist', JSON.stringify(state.items))
    },
    clearWishlist: (state) => {
      state.items = []
      localStorage.removeItem('wishlist')
    },
    loadWishlistFromStorage: (state) => {
      const savedWishlist = localStorage.getItem('wishlist')
      if (savedWishlist) {
        state.items = JSON.parse(savedWishlist)
      }
    },
  },
})

export const { 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist, 
  loadWishlistFromStorage 
} = wishlistSlice.actions

export default wishlistSlice.reducer
