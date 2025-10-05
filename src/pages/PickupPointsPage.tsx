import React, { useState } from 'react'
import { MapPin, Clock, Phone, Mail } from 'lucide-react'

const PickupPointsPage: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null)

  const pickupPoints = [
    {
      id: 1,
      name: "Пункт выдачи №1 - Центр",
      address: "ул. Чуй, 123, г. Бишкек",
      phone: "+996 (XXX) XXX-XX-XX",
      email: "pickup1@luxmart.com",
      workingHours: {
        monday: "9:00 - 20:00",
        tuesday: "9:00 - 20:00",
        wednesday: "9:00 - 20:00",
        thursday: "9:00 - 20:00",
        friday: "9:00 - 20:00",
        saturday: "10:00 - 18:00",
        sunday: "10:00 - 16:00"
      },
      coordinates: { lat: 42.8746, lng: 74.5698 }
    },
    {
      id: 2,
      name: "Пункт выдачи №2 - Юг",
      address: "ул. Ленина, 45, г. Бишкек",
      phone: "+996 (XXX) XXX-XX-XX",
      email: "pickup2@luxmart.com",
      workingHours: {
        monday: "9:00 - 20:00",
        tuesday: "9:00 - 20:00",
        wednesday: "9:00 - 20:00",
        thursday: "9:00 - 20:00",
        friday: "9:00 - 20:00",
        saturday: "10:00 - 18:00",
        sunday: "10:00 - 16:00"
      },
      coordinates: { lat: 42.8546, lng: 74.5898 }
    },
    {
      id: 3,
      name: "Пункт выдачи №3 - Север",
      address: "ул. Московская, 78, г. Бишкек",
      phone: "+996 (XXX) XXX-XX-XX",
      email: "pickup3@luxmart.com",
      workingHours: {
        monday: "9:00 - 20:00",
        tuesday: "9:00 - 20:00",
        wednesday: "9:00 - 20:00",
        thursday: "9:00 - 20:00",
        friday: "9:00 - 20:00",
        saturday: "10:00 - 18:00",
        sunday: "10:00 - 16:00"
      },
      coordinates: { lat: 42.8946, lng: 74.5498 }
    }
  ]

  const getWorkingHoursText = (workingHours: any) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    
    return days.map((day, index) => (
      <span key={day} className="text-sm">
        {dayNames[index]}: {workingHours[day]}
      </span>
    )).join(' • ')
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Пункты выдачи
          </h1>
          <p className="text-xl text-gray-600">
            Выберите удобный пункт выдачи для получения заказа
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Карта будет загружена здесь</p>
              <p className="text-sm text-gray-500 mt-2">
                Интерактивная карта с пунктами выдачи
              </p>
            </div>
          </div>

          {/* Pickup Points List */}
          <div className="space-y-4">
            {pickupPoints.map((point) => (
              <div
                key={point.id}
                className={`bg-white border rounded-lg p-6 cursor-pointer transition-all ${
                  selectedPoint === point.id 
                    ? 'border-primary-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedPoint(point.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {point.name}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{point.address}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{point.phone}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{point.email}</span>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Clock className="w-4 h-4 mt-0.5" />
                        <div className="flex flex-wrap gap-x-2">
                          {getWorkingHoursText(point.workingHours)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedPoint === point.id && (
                    <div className="ml-4">
                      <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Point Details */}
        {selectedPoint && (
          <div className="mt-8 bg-primary-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Выбранный пункт выдачи
            </h3>
            {(() => {
              const point = pickupPoints.find(p => p.id === selectedPoint)
              if (!point) return null
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Адрес</h4>
                    <p className="text-gray-600">{point.address}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Контакты</h4>
                    <p className="text-gray-600">{point.phone}</p>
                    <p className="text-gray-600">{point.email}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h4 className="font-medium text-gray-900 mb-2">Часы работы</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>Пн: {point.workingHours.monday}</div>
                      <div>Вт: {point.workingHours.tuesday}</div>
                      <div>Ср: {point.workingHours.wednesday}</div>
                      <div>Чт: {point.workingHours.thursday}</div>
                      <div>Пт: {point.workingHours.friday}</div>
                      <div>Сб: {point.workingHours.saturday}</div>
                      <div>Вс: {point.workingHours.sunday}</div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Как получить заказ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Выберите пункт</h3>
              <p className="text-sm text-gray-600">
                Выберите удобный пункт выдачи при оформлении заказа
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Дождитесь уведомления</h3>
              <p className="text-sm text-gray-600">
                Мы сообщим, когда заказ будет готов к выдаче
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Получите заказ</h3>
              <p className="text-sm text-gray-600">
                Приходите в выбранный пункт с документом, удостоверяющим личность
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PickupPointsPage
