import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { PickupPoint } from '../../types'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapComponentProps {
  pickupPoints: PickupPoint[]
  selectedPoint?: PickupPoint | null
  onPointSelect?: (point: PickupPoint) => void
  center?: [number, number]
  zoom?: number
  height?: string
}

const MapComponent: React.FC<MapComponentProps> = ({
  pickupPoints,
  selectedPoint,
  onPointSelect,
  center = [42.8746, 74.5698], // Bishkek coordinates
  zoom = 12,
  height = '400px'
}) => {
  const mapRef = useRef<L.Map>(null)

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
  })

  const selectedIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
  })

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {pickupPoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={selectedPoint?.id === point.id ? selectedIcon : customIcon}
            eventHandlers={{
              click: () => onPointSelect?.(point)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {point.address}
                </p>
                {point.phone && (
                  <p className="text-sm text-gray-600 mb-2">
                    📞 {point.phone}
                  </p>
                )}
                {point.email && (
                  <p className="text-sm text-gray-600 mb-2">
                    ✉️ {point.email}
                  </p>
                )}
                <div className="text-xs text-gray-500">
                  <p>Пн-Пт: {point.workingHours.monday}</p>
                  <p>Сб-Вс: {point.workingHours.saturday}</p>
                </div>
                {onPointSelect && (
                  <button
                    onClick={() => onPointSelect(point)}
                    className="mt-2 w-full bg-primary-600 text-white py-1 px-2 rounded text-xs hover:bg-primary-700"
                  >
                    Выбрать
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapComponent
