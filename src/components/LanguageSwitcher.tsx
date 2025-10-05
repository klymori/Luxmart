import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Button from './ui/Button'
import { Globe } from 'lucide-react'

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation()

  const languages = [
    { code: 'ru', name: 'Русский', shortName: 'RU', flag: '🇷🇺' },
    { code: 'en', name: 'English', shortName: 'EN', flag: '🇺🇸' },
    { code: 'kg', name: 'Кыргызча', shortName: 'KG', flag: '🇰🇬' }
  ]

  // Load saved language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng')
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [])

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    localStorage.setItem('i18nextLng', languageCode)
    // Force page reload to ensure all translations are updated
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return (
    <div className="relative group">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3"
      >
        <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">{currentLanguage.shortName}</span>
      </Button>
      
      <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 sm:space-x-3 first:rounded-t-lg last:rounded-b-lg ${
              i18n.language === language.code ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
            }`}
          >
            <span className="text-base sm:text-lg">{language.flag}</span>
            <div className="flex-1">
              <span className="text-sm font-medium">{language.shortName}</span>
              <span className="hidden sm:inline text-sm text-gray-500 ml-1">- {language.name}</span>
            </div>
            {i18n.language === language.code && (
              <span className="text-indigo-600 text-sm">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
