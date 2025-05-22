import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaImage, FaMapMarkerAlt, FaTrash, FaPhone, FaTag } from 'react-icons/fa'

const IlanEkle = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    baslik: '',
    aciklama: '',
    fiyat: '',
    konum: '',
    iletisim: '',
    resimler: [],
    satildi: false,
    kategori: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [kullaniciAdi, setKullaniciAdi] = useState('')

  // Kategori seçenekleri
  const kategoriler = [
    'Yemek',
    'Kozmetik',
    'Giyim',
    'Teknoloji',
    'Elektronik Sigara & Puff'
  ]

  useEffect(() => {
    // Kullanıcı adını localStorage'dan al
    const storedKullaniciAdi = localStorage.getItem('kullaniciAdi')
    if (!storedKullaniciAdi) {
      // Kullanıcı adı yoksa kullanıcı belirleme sayfasına yönlendir
      navigate('/kullanici-belirle')
    } else {
      setKullaniciAdi(storedKullaniciAdi)
    }
  }, [navigate])

  // Dosya seçildiğinde base64'e çevir
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
    
    if (name === 'iletisim') {
      // Eğer değer boşsa, boş bırak
      if (!value) {
        setFormData(prev => ({
          ...prev,
          [name]: ''
        }))
        return
      }

      // +90 prefix'ini kaldır ve sadece rakamları al
      const numbers = value.replace('+90 ', '').replace(/\D/g, '')
      
      // İlk rakam 0 ise, onu kaldır
      const cleanNumbers = numbers.startsWith('0') ? numbers.slice(1) : numbers
      
      // Maksimum 10 rakam olacak şekilde sınırla
      const limitedNumbers = cleanNumbers.slice(0, 10)
      
      // Format: +90 5XX XXX XX XX
      let formattedNumber = ''
      if (limitedNumbers.length > 0) {
        formattedNumber = '+90 ' + limitedNumbers.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedNumber
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Form verilerini kontrol et
      if (!formData.baslik || !formData.aciklama || !formData.fiyat || !formData.konum || !formData.kategori) {
        throw new Error('Lütfen tüm alanları doldurun')
      }
      if (formData.resimler.length === 0) {
        throw new Error('En az bir resim yüklemelisiniz')
      }

      console.log('Gönderilecek veri:', {
        ...formData,
        kullaniciAdi,
        tarih: new Date().toISOString()
      });

      // API'ye gönder
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 saniye timeout

      try {
        console.log('İstek gönderiliyor...');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ilanlar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            kullaniciAdi,
            tarih: new Date().toISOString()
          })
        });

        clearTimeout(timeoutId);
        console.log('Sunucu yanıtı alındı:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Sunucu hatası:', errorData);
          throw new Error(errorData.message || 'İlan eklenirken bir hata oluştu');
        }

        const data = await response.json();
        console.log('Sunucu yanıtı:', data);
        
        // Başarılı mesajı göster ve keşfet sayfasına yönlendir
        alert('İlan başarıyla eklendi!')
        navigate('/kesfet')
      } catch (err) {
        if (err.name === 'AbortError') {
          console.error('İstek zaman aşımına uğradı');
          throw new Error('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.');
        }
        console.error('İstek hatası:', err);
        throw err;
      }
    } catch (err) {
      console.error('İlan ekleme hatası:', err)
      setError(err.message || 'İlan eklenirken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  if (!kullaniciAdi) {
    return null // Kullanıcı adı yoksa hiçbir şey gösterme
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Yeni İlan Ekle</h2>
          
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
              <label htmlFor="iletisim" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                İletişim Numarası
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="iletisim"
                  name="iletisim"
                  value={formData.iletisim}
                  onChange={handleChange}
                  placeholder="+90 5XX XXX XX XX"
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Kategori
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTag className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="kategori"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">Kategori Seçin</option>
                  {kategoriler.map((kategori) => (
                    <option key={kategori} value={kategori}>
                      {kategori}
                    </option>
                  ))}
                </select>
              </div>
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

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'İlan Ekleniyor...' : 'İlan Ekle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default IlanEkle 