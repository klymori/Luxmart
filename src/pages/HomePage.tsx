import React from 'react'
import HeroSection from '../components/home/HeroSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import CategoriesSection from '../components/home/CategoriesSection'
import PromoBanners from '../components/home/PromoBanners'
import NewProducts from '../components/home/NewProducts'
import SaleProducts from '../components/home/SaleProducts'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Newsletter from '../components/home/Newsletter'

const HomePage: React.FC = () => {
  return (
    <div className="w-full space-y-8 sm:space-y-12 lg:space-y-16">
      <HeroSection />
      <PromoBanners />
      <CategoriesSection />
      <FeaturedProducts />
      <NewProducts />
      <SaleProducts />
      <WhyChooseUs />
      <Newsletter />
    </div>
  )
}

export default HomePage
