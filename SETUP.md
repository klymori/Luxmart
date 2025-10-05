# Инструкция по запуску проекта Luxmart

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск в режиме разработки
```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## 📦 Установка дополнительных зависимостей

Если при установке возникли ошибки, установите зависимости по отдельности:

```bash
# Основные зависимости
npm install react react-dom react-router-dom
npm install @reduxjs/toolkit react-redux
npm install react-i18next i18next
npm install leaflet react-leaflet
npm install fuse.js
npm install swiper react-swiper
npm install recharts
npm install react-hot-toast

# Dev зависимости
npm install -D @types/react @types/react-dom @types/leaflet
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D jest @types/jest jest-environment-jsdom
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D eslint eslint-plugin-react-hooks eslint-plugin-react-refresh
npm install -D tailwindcss autoprefixer postcss
npm install -D @vitejs/plugin-react vite
```

## 🛠️ Настройка окружения

### 1. Создайте файл .env в корне проекта:
```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Luxmart
VITE_APP_VERSION=1.0.0
```

### 2. Настройте API endpoints
В файлах `src/api/*.ts` замените базовые URL на ваши реальные endpoints.

## 🗄️ Настройка базы данных

### Вариант 1: JSON Server (для разработки)
```bash
# Установите json-server глобально
npm install -g json-server

# Создайте файл db.json с тестовыми данными
# Запустите сервер
json-server --watch db.json --port 3001
```

### Вариант 2: Реальная база данных
Настройте подключение к PostgreSQL/MongoDB в вашем бэкенде.

## 🧪 Запуск тестов

```bash
# Все тесты
npm test

# Тесты в watch режиме
npm run test:watch

# Покрытие кода
npm run test:coverage
```

## 🚀 Сборка для продакшена

```bash
# Сборка
npm run build

# Предварительный просмотр
npm run preview
```

## 🌐 Деплой

### Vercel
1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Деплой произойдет автоматически

### Netlify
1. Подключите репозиторий к Netlify
2. Настройте команду сборки: `npm run build`
3. Настройте папку публикации: `dist`

### GitHub Pages
```bash
# Установите gh-pages
npm install -D gh-pages

# Добавьте в package.json:
"scripts": {
  "deploy": "gh-pages -d dist"
}

# Соберите и задеплойте
npm run build
npm run deploy
```

## 🔧 Настройка линтера

```bash
# Проверка кода
npm run lint

# Автоисправление
npm run lint -- --fix
```

## 📱 Тестирование на мобильных устройствах

1. Запустите приложение: `npm run dev`
2. Найдите IP адрес вашего компьютера
3. Откройте на мобильном устройстве: `http://YOUR_IP:3000`

## 🐛 Решение проблем

### Ошибка с модулями
```bash
# Очистите кэш
rm -rf node_modules package-lock.json
npm install
```

### Ошибка с TypeScript
```bash
# Перезапустите TypeScript сервер в VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

### Ошибка с TailwindCSS
```bash
# Убедитесь, что TailwindCSS правильно настроен
npx tailwindcss init -p
```

## 📊 Мониторинг производительности

### Lighthouse
1. Откройте DevTools в Chrome
2. Перейдите на вкладку Lighthouse
3. Запустите аудит производительности

### Bundle Analyzer
```bash
# Установите bundle analyzer
npm install -D vite-bundle-analyzer

# Анализ размера бандла
npm run build -- --analyze
```

## 🔒 Настройка безопасности

### HTTPS в разработке
```bash
# Установите mkcert для локальных сертификатов
npm install -g mkcert
mkcert -install
mkcert localhost 127.0.0.1 ::1
```

### Content Security Policy
Добавьте в `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

## 📈 Оптимизация

### Изображения
- Используйте WebP формат
- Оптимизируйте размеры изображений
- Добавьте lazy loading

### Код
- Используйте React.memo для компонентов
- Реализуйте code splitting
- Оптимизируйте bundle size

## 🆘 Поддержка

Если у вас возникли проблемы:

1. Проверьте версию Node.js (требуется 18+)
2. Убедитесь, что все зависимости установлены
3. Проверьте консоль браузера на ошибки
4. Создайте Issue в репозитории

## 📚 Полезные ссылки

- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Leaflet](https://leafletjs.com/)

---

**Удачной разработки! 🚀**
