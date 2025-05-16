import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaFilter, FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaCheck, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Kesfet = () => {
  const navigate = useNavigate()
  const [ilanlar, setIlanlar] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showSold, setShowSold] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalIlanlar, setTotalIlanlar] = useState(0)

  const kategoriler = [
    'Yemek',
    'Kozmetik',
    'Giyim',
    'Teknoloji',
    'Elektronik Sigara & Puff'
  ]

  useEffect(() => {
    fetchIlanlar()
  }, [currentPage, searchTerm, selectedCategory, showSold])

  const fetchIlanlar = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `http://localhost:5001/api/ilanlar?page=${currentPage}&limit=20&search=${searchTerm}&category=${selectedCategory}&showSold=${showSold}`
      )
      const data = await response.json()
      setIlanlar(data.ilanlar)
      setTotalPages(data.totalPages)
      setTotalIlanlar(data.totalIlanlar)
    } catch (error) {
      console.error('İlanlar yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleIlanClick = (ilan) => {
    navigate(`/ilan-detay/${ilan._id}`)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            İlanları Keşfet
          </h1>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <input
                type="text"
                placeholder="İlan ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all group-hover:border-blue-500 dark:group-hover:border-blue-400"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <FaFilter className="mr-2" />
              Filtrele
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Filtreler
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kategori Filtresi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kategori
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tüm Kategoriler</option>
                    {kategoriler.map((kategori) => (
                      <option key={kategori} value={kategori}>
                        {kategori}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Satıldı Filtresi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Satış Durumu
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showSold}
                        onChange={(e) => setShowSold(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        Satılanları Göster
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* İlanlar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ilanlar.length > 0 ? (
            ilanlar.map((ilan) => (
              <div
                key={ilan._id}
                onClick={() => handleIlanClick(ilan)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
              >
                {/* Resim */}
                <div className="relative h-48">
                  {ilan.resimler && ilan.resimler.length > 0 ? (
                    <img
                      src={ilan.resimler[0]}
                      alt={ilan.baslik}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500">Resim Yok</span>
                    </div>
                  )}
                  {ilan.satildi && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                      Satıldı
                    </div>
                  )}
                </div>

                {/* İlan Bilgileri */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {ilan.baslik}
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      ₺{ilan.fiyat}
                    </span>
                    <span className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <FaMapMarkerAlt className="mr-1" />
                      {ilan.konum}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
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
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-400 py-8">
              Arama kriterlerine uygun ilan bulunamadı.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronLeft />
              </button>
              <span className="text-gray-700 dark:text-gray-300">
                Sayfa {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronRight />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

export default Kesfet 