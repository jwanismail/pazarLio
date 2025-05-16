import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaCheck } from 'react-icons/fa'

const Ilanlarim = () => {
  const navigate = useNavigate()
  const [ilanlar, setIlanlar] = useState([])
  const [loading, setLoading] = useState(true)
  const [kullaniciAdi, setKullaniciAdi] = useState('')

  useEffect(() => {
    // Kullanıcı adını localStorage'dan al
    const storedKullaniciAdi = localStorage.getItem('kullaniciAdi')
    if (!storedKullaniciAdi) {
      navigate('/kullanici-belirle')
    } else {
      setKullaniciAdi(storedKullaniciAdi)
      // İlanları sunucudan çek
      const fetchIlanlar = async () => {
        try {
          console.log('İlanlar getiriliyor...', storedKullaniciAdi);
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ilanlar/kullanici/${storedKullaniciAdi}`);
          if (!response.ok) {
            throw new Error('İlanlar yüklenirken bir hata oluştu');
          }
          const data = await response.json();
          console.log('Gelen ilanlar:', data);
          if (data.success && data.ilanlar) {
            setIlanlar(data.ilanlar);
          } else {
            setIlanlar([]);
          }
          setLoading(false);
        } catch (error) {
          console.error('İlanlar yüklenirken hata:', error);
          setLoading(false);
          setIlanlar([]);
        }
      };

      fetchIlanlar();
    }
  }, [navigate])

  const handleDelete = async (ilanId) => {
    if (window.confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
      try {
        // Sunucudan ilanı sil
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ilanlar/${ilanId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('İlan silinirken bir hata oluştu');
        }

        // State'i güncelle
        setIlanlar(prev => prev.filter(ilan => ilan._id !== ilanId));

        alert('İlan başarıyla silindi');
      } catch (error) {
        console.error('İlan silinirken hata:', error);
        alert('İlan silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  }

  const handleEdit = (ilanId) => {
    navigate(`/ilan-duzenle/${ilanId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            İlanlarım
          </h1>
          <Link
            to="/ilan-ekle"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-2" />
            Yeni İlan Ekle
          </Link>
        </div>

        {ilanlar.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ilanlar.map(ilan => (
              <div
                key={ilan._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative">
                  {ilan.resimler && ilan.resimler.length > 0 ? (
                    <img
                      src={ilan.resimler[0]}
                      alt={ilan.baslik}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500">Resim Yok</span>
                    </div>
                  )}
                  {ilan.satildi && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      Satıldı
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {ilan.baslik}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {ilan.aciklama}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      ₺{ilan.fiyat}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(ilan._id)}
                        className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Düzenle"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(ilan._id)}
                        className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        title="Sil"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Henüz İlanınız Yok
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Yeni bir ilan ekleyerek başlayın.
            </p>
            <Link
              to="/ilan-ekle"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaPlus className="mr-2" />
              Yeni İlan Ekle
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Ilanlarim 