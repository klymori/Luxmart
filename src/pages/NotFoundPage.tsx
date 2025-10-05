import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import { Home, ArrowLeft, Search } from 'lucide-react'

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            404
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('error.pageNotFound')}
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            {t('error.pageNotFoundDescription')}
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Search className="w-16 h-16 text-white" />
          </div>
          <p className="text-sm text-gray-500">
            {t('error.pageNotFoundHint')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to="/" className="block">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Home className="w-4 h-4 mr-2" />
              {t('error.goHome')}
            </Button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('error.goBack')}
            </Button>
          </button>

          <Link to="/catalog" className="block">
            <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700">
              {t('error.browseCatalog')}
            </Button>
          </Link>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            {t('error.needHelp')}
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/contacts" className="text-indigo-600 hover:text-indigo-700">
              {t('navigation.contacts')}
            </Link>
            <Link to="/faq" className="text-indigo-600 hover:text-indigo-700">
              {t('navigation.faq')}
            </Link>
            <Link to="/support" className="text-indigo-600 hover:text-indigo-700">
              {t('error.support')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage