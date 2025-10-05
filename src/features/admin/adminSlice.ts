import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AdminStats } from '../../types'

interface AdminState {
  stats: AdminStats | null
  isLoading: boolean
  selectedTab: string
  filters: {
    dateRange: {
      start: string
      end: string
    }
    status: string
    search: string
  }
}

const initialState: AdminState = {
  stats: null,
  isLoading: false,
  selectedTab: 'dashboard',
  filters: {
    dateRange: {
      start: '',
      end: '',
    },
    status: '',
    search: '',
  },
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setStats: (state, action: PayloadAction<AdminStats>) => {
      state.stats = action.payload
    },
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<AdminState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = {
        dateRange: {
          start: '',
          end: '',
        },
        status: '',
        search: '',
      }
    },
  },
})

export const {
  setLoading,
  setStats,
  setSelectedTab,
  setFilters,
  resetFilters,
} = adminSlice.actions

export default adminSlice.reducer
