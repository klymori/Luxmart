import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const galleryImages = [
    { id: 1, src: '/api/placeholder/800/600', title: 'Офис Luxmart' },
    { id: 2, src: '/api/placeholder/800/600', title: 'Склад товаров' },
    { id: 3, src: '/api/placeholder/800/600', title: 'Команда разработки' },
    { id: 4, src: '/api/placeholder/800/600', title: 'Служба поддержки' },
    { id: 5, src: '/api/placeholder/800/600', title: 'Логистический центр' },
    { id: 6, src: '/api/placeholder/800/600', title: 'Упаковка заказов' },
    { id: 7, src: '/api/placeholder/800/600', title: 'Доставка' },
    { id: 8, src: '/api/placeholder/800/600', title: 'Клиентский сервис' },
  ]

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Галерея
        </h1>
        <p className="text-xl text-gray-600">
          Загляните за кулисы Luxmart
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="group cursor-pointer"
            onClick={() => openModal(image.src)}
          >
            <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-2">
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="mt-3 text-sm font-medium text-gray-900 text-center">
              {image.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Video Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Видео о нас
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChevronRight className="w-8 h-8 text-primary-600" />
              </div>
              <p className="text-gray-600">Видео о компании</p>
            </div>
          </div>
          
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChevronRight className="w-8 h-8 text-primary-600" />
              </div>
              <p className="text-gray-600">Процесс доставки</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
            
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPage
