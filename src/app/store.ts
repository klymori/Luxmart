import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authSlice from '../features/auth/authSlice'
import cartSlice from '../features/cart/cartSlice'
import wishlistSlice from '../features/wishlist/wishlistSlice'
import uiSlice from '../features/ui/uiSlice'
import adminSlice from '../features/admin/adminSlice'
import { productsApi } from '../api/productsApi'
import { authApi } from '../api/authApi'
import { ordersApi } from '../api/ordersApi'
import { reviewsApi } from '../api/reviewsApi'
import { bannersApi } from '../api/bannersApi'
import { pickupApi } from '../api/pickupApi'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    ui: uiSlice,
    admin: adminSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [bannersApi.reducerPath]: bannersApi.reducer,
    [pickupApi.reducerPath]: pickupApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    })
      .concat(productsApi.middleware)
      .concat(authApi.middleware)
      .concat(ordersApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(bannersApi.middleware)
      .concat(pickupApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
