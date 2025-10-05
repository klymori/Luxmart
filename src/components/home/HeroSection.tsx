import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react'

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Luxmart Store" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80"></div>
      </div>
      
      <div className="relative container mx-auto px-2 sm:px-4 py-12 sm:py-16 lg:py-20 xl:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Добро пожаловать в{' '}
                <span className="text-yellow-300">Luxmart</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100">
                Современный интернет-магазин с широким ассортиментом товаров
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                  Перейти в каталог
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Узнать больше
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Быстрая доставка</p>
                  <p className="text-sm text-gray-200">До 24 часов</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Гарантия качества</p>
                  <p className="text-sm text-gray-200">100% оригинал</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Круглосуточно</p>
                  <p className="text-sm text-gray-200">24/7 поддержка</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Luxmart Shopping"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <Star className="w-10 h-10 text-yellow-600" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
