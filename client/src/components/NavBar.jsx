import React, { useState } from "react";
import DoctorModal from "./DoctorModal";
import MigrantModal from "./MigrantModal";

export default function CustomNavbar() {
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showMigrantModal, setShowMigrantModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle for the Doctor modal
  const handleDoctorModalToggle = () => {
    setShowDoctorModal(!showDoctorModal);
    setShowDropdown(false);
  };

  // Toggle for the Migrant modal
  const handleMigrantModalToggle = () => {
    setShowMigrantModal(!showMigrantModal);
    setShowDropdown(false);
  };

  // Toggle for the dropdown menu itself
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-white text-gray-900 sticky top-0 shadow-sm z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Brand */}
        <a className="font-bold text-lg flex items-center gap-2" href="#">
          <i className="bi bi-heart-pulse-fill text-red-500 text-xl"></i>Migrant Health
        </a>

        {/* Toggler */}
        <button
          className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapse */}
        <div className="hidden lg:flex lg:items-center" id="nav">
          <ul className="flex items-center gap-3">
            {/* Sign in dropdown */}
            <li className="relative">
              <a
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-colors inline-flex items-center gap-2"
                href="#"
                role="button"
                onClick={handleDropdownToggle}
                aria-expanded={showDropdown}
              >
                Sign in
              </a>
              <ul className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ${showDropdown ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                <li>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={handleDoctorModalToggle}
                  >
                    Doctor / Health Worker
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={handleMigrantModalToggle}
                  >
                    Migrant Worker
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <DoctorModal show={showDoctorModal} onClose={handleDoctorModalToggle} />
      <MigrantModal show={showMigrantModal} onClose={handleMigrantModalToggle} />
    </nav>
  );
}