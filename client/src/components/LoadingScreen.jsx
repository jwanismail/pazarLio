const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-800 animate-fadeIn">
      <div className="text-center">
        <div className="mb-8 animate-scaleIn">
          <h1 className="text-4xl font-bold text-white mb-2 animate-slideDown">Alım Satım</h1>
          <p className="text-blue-100 animate-slideUp">Güvenli ve Hızlı Alışveriş</p>
        </div>

        <div className="h-1 bg-white rounded-full w-48 mx-auto animate-loadingBar" />

        <div className="mt-8 text-blue-100 animate-fadeIn">
          Yükleniyor...
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen 