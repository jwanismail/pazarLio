import { Link } from 'react-router-dom'
import { FaPlus, FaSearch, FaArrowRight } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Dark mod durumunu kontrol et
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)

    // Dark mod değişikliklerini dinle
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          setIsDarkMode(isDark)
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex items-center justify-center gap-0 mb-6">
            <img 
              src={isDarkMode ? "/darkmode/d-logo.png" : "/logo.png"}
              alt="pazarLio" 
              className="h-56 object-contain hover:scale-105 transition-transform duration-300"
            />
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 -ml-8">
              Alım Satım Platformu
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            Güvenli ve hızlı bir şekilde alım satım yapın. İlanlarınızı keşfedin veya yeni ilan verin.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/kesfet"
              className="group flex items-center justify-center px-8 py-4 rounded-full text-lg font-bold text-white bg-black border-2 border-black hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              İlanları Keşfet
              <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              to="/ilan-ver"
              className="group flex items-center justify-center px-8 py-4 rounded-full text-lg font-bold text-yellow-500 border-2 border-yellow-400 bg-white hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <FaPlus className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Yeni İlan Ver
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-blue-50 dark:hover:bg-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaSearch className="text-blue-600 dark:text-blue-400 text-xl group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              Kolay Keşfet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
              Kategorilere göre filtreleme ve arama özellikleriyle istediğiniz ilanı kolayca bulun.
            </p>
          </div>

          <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-green-50 dark:hover:bg-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaPlus className="text-green-600 dark:text-green-400 text-xl group-hover:rotate-90 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
              Hızlı İlan Ver
            </h3>
            <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
              Birkaç adımda ilanınızı oluşturun ve hemen yayınlayın.
            </p>
          </div>

          <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-purple-50 dark:hover:bg-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
              Güvenli Alışveriş
            </h3>
            <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
              Güvenli bir şekilde alım satım yapın ve iletişime geçin.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 