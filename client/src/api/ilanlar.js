import api from './auth'

export const ilanService = {
  // Kullanıcının ilanlarını getir
  getMyIlanlar: async () => {
    try {
      const response = await api.get('/ilanlar/benim-ilanlarim')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Yeni ilan oluştur
  createIlan: async (ilanData) => {
    try {
      const response = await api.post('/ilanlar', ilanData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // İlan güncelle
  updateIlan: async (id, ilanData) => {
    try {
      const response = await api.put(`/ilanlar/${id}`, ilanData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // İlan sil
  deleteIlan: async (id) => {
    try {
      const response = await api.delete(`/ilanlar/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
} 