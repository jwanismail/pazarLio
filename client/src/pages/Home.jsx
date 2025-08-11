import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  FaPlus, 
  FaSearch, 
  FaArrowRight, 
  FaUser, 
  FaShieldAlt, 
  FaRocket, 
  FaHeart, 
  FaUsers, 
  FaShoppingCart, 
  FaStar,
  FaMobile,
  FaDesktop,
  FaTablet,
  FaChevronDown,
  FaPlay,
  FaCheck,
  FaHandshake,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaFacebook
} from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)

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

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: <FaSearch className="text-xl sm:text-2xl" />,
      title: "Akıllı Arama",
      description: "Gelişmiş filtreleme ve arama özellikleriyle istediğiniz ürünü saniyeler içinde bulun",
      color: "blue",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaRocket className="text-xl sm:text-2xl" />,
      title: "Hızlı İlan",
      description: "Adım adım rehberle birkaç dakikada ilanınızı oluşturun ve yayınlayın",
      color: "green",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: <FaShieldAlt className="text-xl sm:text-2xl" />,
      title: "Güvenli Alışveriş",
      description: "Doğrulanmış kullanıcılar ve güvenli iletişim kanalları ile güvenle alışveriş yapın",
      color: "purple",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaHeart className="text-xl sm:text-2xl" />,
      title: "Kişiselleştirilmiş",
      description: "İlgi alanlarınıza göre özelleştirilmiş ilanlar ve öneriler alın",
      color: "pink",
      gradient: "from-pink-500 to-pink-600"
    }
  ]

  const categories = [
    { name: "Teknoloji", icon: "💻", count: "150+", color: "bg-blue-500", gradient: "from-blue-400 to-blue-600" },
    { name: "Giyim", icon: "👕", count: "300+", color: "bg-green-500", gradient: "from-green-400 to-green-600" },
    { name: "Kozmetik", icon: "💄", count: "200+", color: "bg-pink-500", gradient: "from-pink-400 to-pink-600" },
    { name: "Yemek", icon: "🍕", count: "100+", color: "bg-orange-500", gradient: "from-orange-400 to-orange-600" },
    { name: "Elektronik", icon: "📱", count: "250+", color: "bg-purple-500", gradient: "from-purple-400 to-purple-600" },
    { name: "Spor", icon: "⚽", count: "120+", color: "bg-red-500", gradient: "from-red-400 to-red-600" }
  ]

  const stats = [
    { number: "1000+", label: "Aktif İlan", icon: <FaShoppingCart />, color: "text-blue-500" },
    { number: "500+", label: "Mutlu Kullanıcı", icon: <FaUsers />, color: "text-green-500" },
    { number: "50+", label: "Kategori", icon: <FaStar />, color: "text-yellow-500" },
    { number: "24/7", label: "Destek", icon: <FaShieldAlt />, color: "text-purple-500" }
  ]

  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "Bilgisayar Mühendisliği",
      content: "Bu platform sayesinde yurtta kalmaya başladığım ilk hafta ihtiyacım olan her şeyi buldum. Çok pratik!",
      avatar: "👨‍🎓"
    },
    {
      name: "Ayşe Demir",
      role: "Tıp Fakültesi",
      content: "Güvenli ve hızlı. Yurt arkadaşlarımla güvenle alışveriş yapabiliyorum. Kesinlikle tavsiye ederim!",
      avatar: "👩‍⚕️"
    },
    {
      name: "Mehmet Kaya",
      role: "İşletme Fakültesi",
      content: "İlan vermek çok kolay. Birkaç dakikada ürünümü sattım. Harika bir deneyim!",
      avatar: "👨‍💼"
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center px-4"
        >
          <motion.div
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaRocket className="text-white text-2xl sm:text-3xl" />
          </motion.div>
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            pazarLio
          </motion.h1>
          <motion.p 
            className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Yükleniyor...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>PazarLio - Türkiye'nin En Güvenilir İkinci El Alışveriş Platformu</title>
        <meta name="description" content="PazarLio ile güvenli, hızlı ve kolay ikinci el alışveriş yapın. Binlerce ilan arasından istediğiniz ürünü bulun, satın alın veya satın. Ücretsiz ilan verin!" />
        <meta name="keywords" content="ikinci el, alışveriş, satış, ilan, pazar, güvenli alışveriş, Türkiye, online pazar, ikinci el eşya, kullanılmış ürün" />
        <meta name="author" content="PazarLio" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="tr" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pazarlio.com/" />
        <meta property="og:title" content="PazarLio - Türkiye'nin En Güvenilir İkinci El Alışveriş Platformu" />
        <meta property="og:description" content="PazarLio ile güvenli, hızlı ve kolay ikinci el alışveriş yapın. Binlerce ilan arasından istediğiniz ürünü bulun, satın alın veya satın." />
        <meta property="og:image" content="https://pazarlio.com/og-image.jpg" />
        <meta property="og:site_name" content="PazarLio" />
        <meta property="og:locale" content="tr_TR" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pazarlio.com/" />
        <meta property="twitter:title" content="PazarLio - Türkiye'nin En Güvenilir İkinci El Alışveriş Platformu" />
        <meta property="twitter:description" content="PazarLio ile güvenli, hızlı ve kolay ikinci el alışveriş yapın. Binlerce ilan arasından istediğiniz ürünü bulun, satın alın veya satın." />
        <meta property="twitter:image" content="https://pazarlio.com/twitter-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://pazarlio.com/" />
        
        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PazarLio" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "PazarLio",
            "url": "https://pazarlio.com",
            "description": "Türkiye'nin en güvenilir ikinci el alışveriş platformu",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://pazarlio.com/kesfet?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 sm:pb-32">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 mb-6 sm:mb-8 shadow-lg"
            >
              <FaRocket className="text-blue-600 mr-2 sm:mr-3 text-sm sm:text-base" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                Yurt Öğrencileri İçin Özel Platform
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Alım Satım
              </span>
              <br />
              <span className="text-slate-800 dark:text-slate-200">Platformu</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-medium px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Yurt arkadaşlarınızla güvenli ve hızlı bir şekilde alım satım yapın. 
              İlanlarınızı keşfedin veya yeni ilan verin.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                to="/kesfet"
                className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 overflow-hidden text-base sm:text-lg"
              >
                <span className="relative z-10 flex items-center justify-center">
                  İlanları Keşfet
                  <FaArrowRight className="ml-2 sm:ml-3 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              {user ? (
                <Link
                  to="/ilan-ver"
                  className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl sm:rounded-3xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 text-base sm:text-lg"
                >
                  <span className="flex items-center justify-center">
                    <FaPlus className="mr-2 sm:mr-3 group-hover:rotate-90 transition-transform duration-300" />
                    Yeni İlan Ver
                  </span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl sm:rounded-3xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 text-base sm:text-lg"
                >
                  <span className="flex items-center justify-center">
                    <FaUser className="mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Giriş Yap & İlan Ver
                  </span>
                </Link>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 sm:p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1 sm:mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaChevronDown className="text-slate-400 text-xl sm:text-2xl" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 px-2">
              Neden <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">pazarLio</span>?
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              Yurt öğrencileri için özel olarak tasarlanmış özellikler ile güvenli ve hızlı alışveriş deneyimi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, sm: { y: -10 } }}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl sm:rounded-3xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 px-2">
              Popüler <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Kategoriler</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              İhtiyacınız olan her şeyi kategorilere göre keşfedin
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link to="/kesfet" className="block">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group-hover:border-blue-300 dark:group-hover:border-blue-600">
                    <div className="text-3xl sm:text-5xl mb-3 sm:mb-6">{category.icon}</div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm sm:text-lg">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {category.count} ilan
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 px-2">
              Kullanıcı <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Deneyimleri</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              Yurt arkadaşlarımızın pazarLio hakkındaki görüşleri
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, sm: { y: -10 } }}
              >
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-6">{testimonial.avatar}</div>
                <p className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-lg">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 px-2">
              Hemen Başlayın!
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Yurt arkadaşlarınızla güvenli alışveriş deneyimini yaşayın. 
              Binlerce ilan arasından ihtiyacınız olanı bulun veya kendi ilanınızı verin.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
              <Link
                to="/kesfet"
                className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-blue-600 font-bold rounded-2xl sm:rounded-3xl hover:bg-slate-100 transition-colors duration-300 shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-base sm:text-lg"
              >
                İlanları Keşfet
              </Link>
              {!user && (
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-transparent text-white font-bold rounded-2xl sm:rounded-3xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-base sm:text-lg"
                >
                  Ücretsiz Kayıt Ol
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                pazarLio
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed text-sm sm:text-base">
                Yurt öğrencileri için özel olarak tasarlanmış güvenli alım satım platformu. 
                Arkadaşlarınızla güvenle alışveriş yapın.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <FaInstagram className="text-xl sm:text-2xl" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <FaTwitter className="text-xl sm:text-2xl" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <FaFacebook className="text-xl sm:text-2xl" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li><Link to="/kesfet" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">İlanları Keşfet</Link></li>
                <li><Link to="/ilan-ver" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">İlan Ver</Link></li>
                <li><Link to="/login" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Giriş Yap</Link></li>
                <li><Link to="/register" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Kayıt Ol</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-400 text-sm sm:text-base">
                  <FaEnvelope className="mr-2 flex-shrink-0" />
                  <span className="break-all">info@pazarli.com</span>
                </li>
                <li className="flex items-center text-slate-400 text-sm sm:text-base">
                  <FaPhone className="mr-2 flex-shrink-0" />
                  +90 555 123 4567
                </li>
                <li className="flex items-center text-slate-400 text-sm sm:text-base">
                  <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                  İstanbul, Türkiye
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-slate-400 text-sm sm:text-base">
              © 2024 pazarLio. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

export default Home 