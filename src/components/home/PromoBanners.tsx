import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { useGetActiveBannersQuery } from '../../api/bannersApi'
import LoadingSpinner from '../ui/LoadingSpinner'

const PromoBanners: React.FC = () => {
  const { data: banners, isLoading, error } = useGetActiveBannersQuery()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !banners || banners.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="banner-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link to={banner.link || '#'} className="block group">
              <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src={banner.imageUrl}
                  alt={banner.title || 'Промо баннер'}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {(banner.title || banner.description) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      {banner.title && (
                        <h3 className="text-xl font-bold mb-2">{banner.title}</h3>
                      )}
                      {banner.description && (
                        <p className="text-sm opacity-90">{banner.description}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default PromoBanners
