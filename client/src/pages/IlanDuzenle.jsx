import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaImage, FaMapMarkerAlt, FaTrash } from 'react-icons/fa'

const IlanDuzenle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    baslik: '',
    aciklama: '',
    fiyat: '',
    konum: '',
    resimler: [],
    satildi: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [kullaniciAdi, setKullaniciAdi] = useState('')

  useEffect(() => {
    // Kullanıcı adını localStorage'dan al
    const storedKullaniciAdi = localStorage.getItem('kullaniciAdi')
    if (!storedKullaniciAdi) {
      navigate('/kullanici-belirle')
      return
    }
    setKullaniciAdi(storedKullaniciAdi)

    // İlanı localStorage'dan al
    const storedIlanlar = JSON.parse(localStorage.getItem('ilanlar') || '[]')
    const ilan = storedIlanlar.find(i => i.id === id)

    if (!ilan) {
      navigate('/ilanlarim')
      return
    }

    // İlanın sahibi kontrolü
    if (ilan.kullaniciAdi !== storedKullaniciAdi) {
      navigate('/ilanlarim')
      return
    }

    setFormData({
      baslik: ilan.baslik,
      aciklama: ilan.aciklama,
      fiyat: ilan.fiyat,
      konum: ilan.konum,
      resimler: ilan.resimler || [],
      satildi: ilan.satildi || false
    })
    setLoading(false)
  }, [id, navigate])

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files)
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    })
    const base64Images = await Promise.all(promises)
    setFormData(prev => ({
      ...prev,
      resimler: [...prev.resimler, ...base64Images]
    }))
  }

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      resimler: prev.resimler.filter((_, i) => i !== index)
    }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Form verilerini kontrol et
      if (!formData.baslik || !formData.aciklama || !formData.fiyat || !formData.konum) {
        throw new Error('Lütfen tüm alanları doldurun')
      }
      if (formData.resimler.length === 0) {
        throw new Error('En az bir resim yüklemelisiniz')
      }

      // localStorage'dan ilanları al
      const storedIlanlar = JSON.parse(localStorage.getItem('ilanlar') || '[]')
      
      // İlanı güncelle
      const guncelIlanlar = storedIlanlar.map(ilan => {
        if (ilan.id === id) {
          return {
            ...ilan,
            ...formData,
            kullaniciAdi,
            tarih: new Date().toISOString()
          }
        }
        return ilan
      })
      
      // localStorage'a kaydet
      localStorage.setItem('ilanlar', JSON.stringify(guncelIlanlar))

      // Başarılı mesajı göster ve ilanlarım sayfasına yönlendir
      alert('İlan başarıyla güncellendi!')
      navigate('/ilanlarim')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">İlan Düzenle</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="baslik" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                İlan Başlığı
              </label>
              <input
                type="text"
                id="baslik"
                name="baslik"
                value={formData.baslik}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="aciklama" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Açıklama
              </label>
              <textarea
                id="aciklama"
                name="aciklama"
                rows="4"
                value={formData.aciklama}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="fiyat" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fiyat
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="fiyat"
                  name="fiyat"
                  value={formData.fiyat}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 pl-7 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₺</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="konum" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Konum
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="konum"
                  name="konum"
                  value={formData.konum}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Resimler
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.resimler.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {formData.resimler.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt={`Yüklenen resim ${idx + 1}`} className="h-24 w-full object-cover rounded-md" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-80 group-hover:opacity-100"
                        title="Resmi Kaldır"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="satildi"
                name="satildi"
                checked={formData.satildi}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="satildi" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Satıldı olarak işaretle
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'İlan Güncelleniyor...' : 'İlanı Güncelle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default IlanDuzenle 