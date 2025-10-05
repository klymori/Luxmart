import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { useUpdateProfileMutation } from '../api/authApi'
import { updateUser } from '../features/auth/authSlice'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { User, Save } from 'lucide-react'
import { toast } from 'react-hot-toast'

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await updateProfile(formData).unwrap()
      dispatch(updateUser(formData))
      toast.success('Профиль обновлен')
    } catch (error: any) {
      toast.error(error.data?.message || 'Ошибка обновления профиля')
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Необходимо войти в систему
          </h2>
          <p className="text-gray-600">
            Войдите в систему, чтобы просмотреть профиль
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Мой профиль
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Имя"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                />
              </div>
              
              <div>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                />
              </div>
              
              <div>
                <Input
                  label="Телефон"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+996 XXX XXX XXX"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={isLoading}
                className="flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Сохранить изменения
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
