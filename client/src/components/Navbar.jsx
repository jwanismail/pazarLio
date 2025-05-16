import { Link, useLocation } from 'react-router-dom'
import { FaSearch, FaPlus, FaList, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg rounded-[50px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={darkMode ? "/darkmode/d-logo.png" : "/logo.png"}
                alt="pazarLio" 
                className="h-32 object-contain"
              />
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              to="/kesfet"
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center ${location.pathname === '/kesfet' ? 'font-bold underline' : ''}`}
            >
              <FaSearch className="h-5 w-5" />
              <span className="ml-2">Keşfet</span>
            </Link>
            <Link
              to="/ilanlarim"
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center ${location.pathname === '/ilanlarim' ? 'font-bold underline' : ''}`}
            >
              <FaList className="h-5 w-5" />
              <span className="ml-2">İlanlarım</span>
            </Link>
            <Link
              to="/ilan-ver"
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center ${location.pathname === '/ilan-ver' ? 'font-bold underline' : ''}`}
            >
              <FaPlus className="h-5 w-5" />
              <span className="ml-2">İlan Ver</span>
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none"
            >
              {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/kesfet"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/kesfet'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <FaSearch className="h-5 w-5 mr-2" />
                  <span>Keşfet</span>
                </div>
              </Link>
              <Link
                to="/ilanlarim"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/ilanlarim'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <FaList className="h-5 w-5 mr-2" />
                  <span>İlanlarım</span>
                </div>
              </Link>
              <Link
                to="/ilan-ver"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/ilan-ver'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <FaPlus className="h-5 w-5 mr-2" />
                  <span>İlan Ver</span>
                </div>
              </Link>
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <>
                    <FaSun className="h-5 w-5 mr-2" />
                    <span>Açık Mod</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="h-5 w-5 mr-2" />
                    <span>Koyu Mod</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar