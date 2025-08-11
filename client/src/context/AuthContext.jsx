import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// API URL'ini doğrudan tanımla
const API_URL = 'http://localhost:5002'

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini al
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (emailOrPhone, sifre) => {
    try {
      const response = await axios.post(`${API_URL}/giris`, {
        emailOrPhone,
        sifre
      })
      const userData = response.data
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Giriş yapılırken bir hata oluştu'
      }
    }
  }

  const register = async (ad, soyad, email, telefon, sifre) => {
    try {
      const response = await axios.post(`${API_URL}/kayit`, {
        ad,
        soyad,
        email,
        telefon,
        sifre
      })
      const userData = response.data
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Kayıt olurken bir hata oluştu'
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 