import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Light/Dark mode icons
import MigrantModal from "./MigrantModal";
import DoctorModal from "./DoctorModal";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showMigrantModal, setShowMigrantModal] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [language, setLanguage] = useState("English");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setShowLangMenu(false);
    // later: hook translation system here
    console.log("Language switched to:", lang);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400">
              e-Swasthya
            </div>

            {/* Navbar Links */}
            <div className="hidden md:flex space-x-6 items-center">
              <a href="#home" className="text-gray-800 dark:text-gray-200 hover:text-blue-500">
                Home
              </a>
              <a href="#about" className="text-gray-800 dark:text-gray-200 hover:text-blue-500">
                About
              </a>
              <a href="#services" className="text-gray-800 dark:text-gray-200 hover:text-blue-500">
                Services
              </a>
              <a href="#contact" className="text-gray-800 dark:text-gray-200 hover:text-blue-500">
                Contact
              </a>

              {/* Doctor Sign In */}
              <a
                onClick={() => setShowDoctorModal(true)}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Doctor Sign In
              </a>

              {/* Worker Sign In */}
              <a
                onClick={() => setShowMigrantModal(true)}
                className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
              >
                Patient Sign In
              </a>

              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  {language} ▼
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                    <button
                      onClick={() => changeLanguage("English")}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:text-gray-200"
                    >
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage("Hindi")}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:text-gray-200"
                    >
                      हिंदी
                    </button>
                    <button
                      onClick={() => changeLanguage("Bengali")}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:text-gray-200"
                    >
                      বাংলা
                    </button>
                    <button
                      onClick={() => changeLanguage("Marathi")}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:text-gray-200"
                    >
                      मराठी
                    </button>
                  </div>
                )}
              </div>
              
              {/* Dark/Light Toggle */}
              <button
                onClick={toggleDarkMode}
                className="ml-4 text-gray-800 dark:text-gray-200 focus:outline-none"
              >
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <DoctorModal show={showDoctorModal} onClose={() => setShowDoctorModal(false)} />
      <MigrantModal show={showMigrantModal} onClose={() => setShowMigrantModal(false)} />
    </>
  );
};

export default Navbar;
