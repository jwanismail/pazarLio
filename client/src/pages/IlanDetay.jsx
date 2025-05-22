import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaPhone, FaEnvelope, FaCheck, FaUser, FaWhatsapp } from 'react-icons/fa'

const IlanDetay = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ilan, setIlan] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [kullaniciAdi, setKullaniciAdi] = useState(localStorage.getItem('kullaniciAdi') || 'Misafir Kullanıcı')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchIlanDetay = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ilanlar/${id}`)
        const data = await response.json()
        if (data.success) {
          setIlan(data.ilan)
        } else {
          throw new Error(data.message || 'İlan detayı yüklenirken bir hata oluştu')
        }
      } catch (error) {
        console.error('İlan detayı yüklenirken hata:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchIlanDetay()
  }, [id])

  const handleSatildi = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ilanlar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...ilan, satildi: true })
      })

      if (!response.ok) {
        throw new Error('İlan güncellenirken bir hata oluştu')
      }

      const updatedIlan = await response.json()
      setIlan(updatedIlan)
    } catch (error) {
      console.error('İlan güncellenirken hata:', error)
    }
  }

  const handleWhatsApp = () => {
    // Telefon numarasını temizle (sadece rakamları al)
    const phoneNumber = ilan.iletisim.replace(/\D/g, '')
    // WhatsApp linkini oluştur
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=Merhaba, ${ilan.baslik} ilanı hakkında bilgi almak istiyorum.`
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!ilan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            İlan Bulunamadı
          </h2>
          <button
            onClick={() => navigate('/kesfet')}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            İlanlara Geri Dön
          </button>
        </div>
      </div>
    )
  }

  const isIlanSahibi = ilan.kullaniciAdi === kullaniciAdi

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Geri Dön Butonu */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Geri Dön
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Resim Galerisi */}
          <div className="relative">
            {ilan.resimler && ilan.resimler.length > 0 ? (
              <>
                <img
                  src={ilan.resimler[selectedImage]}
                  alt={ilan.baslik}
                  className="w-full h-96 object-cover"
                />
                {ilan.resimler.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {ilan.resimler.map((resim, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index
                            ? 'border-blue-600'
                            : 'border-transparent'
                        }`}
                      >
                        <img
                          src={resim}
                          alt={`${ilan.baslik} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500">Resim Yok</span>
              </div>
            )}
            {ilan.satildi && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full">
                Satıldı
              </div>
            )}
          </div>

          {/* İlan Detayları */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {ilan.baslik}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                  <span className="flex items-center">
                    <FaMapMarkerAlt className="mr-1" />
                    {ilan.konum}
                  </span>
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    {new Date(ilan.tarih).toLocaleDateString('tr-TR')}
                  </span>
                  <span className="flex items-center">
                    <FaUser className="mr-1" />
                    {ilan.kullaniciAdi}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ₺{ilan.fiyat}
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                {ilan.aciklama}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                İletişim Bilgileri
              </h2>
              <div className="flex flex-col space-y-4">
                {ilan.iletisim && (
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                    {ilan.iletisim.includes('@') ? (
                      <a
                        href={`mailto:${ilan.iletisim}`}
                        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <FaEnvelope className="mr-2" />
                        {ilan.iletisim}
                      </a>
                    ) : (
                      <a
                        href={`tel:${ilan.iletisim}`}
                        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <FaPhone className="mr-2" />
                        {ilan.iletisim}
                      </a>
                    )}
                  </div>
                )}
                {ilan.iletisim && !ilan.iletisim.includes('@') && !ilan.satildi && (
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 w-full md:w-auto"
                  >
                    <FaWhatsapp className="mr-2 text-xl" />
                    WhatsApp ile İletişime Geç
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IlanDetay 