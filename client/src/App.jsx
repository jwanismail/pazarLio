// App.jsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Kesfet from './pages/Kesfet'
import IlanEkle from './pages/IlanEkle'
import IlanDetay from './pages/IlanDetay'
import Ilanlarim from './pages/Ilanlarim'
import IlanDuzenle from './pages/IlanDuzenle'
import KullaniciBelirle from './pages/KullaniciBelirle'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    // localStorage'dan gece modu tercihini al
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : false
  })

  useEffect(() => {
    // 2 saniye sonra loading'i kaldır
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Gece modu değiştiğinde localStorage'a kaydet ve HTML class'ını güncelle
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kesfet" element={<Kesfet />} />
            <Route path="/ilan-ekle" element={<IlanEkle />} />
            <Route path="/ilan-ver" element={<IlanEkle />} />
            <Route path="/ilan-detay/:id" element={<IlanDetay />} />
            <Route path="/ilanlarim" element={<Ilanlarim />} />
            <Route path="/ilan-duzenle/:id" element={<IlanDuzenle />} />
            <Route path="/kullanici-belirle" element={<KullaniciBelirle />} />
          </Routes>
        </main>
    </div>
    </Router>
  )
}

export default App
