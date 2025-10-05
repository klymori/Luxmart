import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { useAppSelector } from '../hooks/redux'

const Layout: React.FC = () => {
  const { sidebarOpen } = useAppSelector((state) => state.ui)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex relative">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className="flex-1 min-h-screen w-full">
          <div className="w-full px-2 sm:px-4 py-4 sm:py-8">
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout
