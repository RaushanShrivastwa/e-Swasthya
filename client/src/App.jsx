// src/App.jsx
import React, { useState } from "react";
import CustomNavbar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import "./index.css";
import "./App.css";

/**
 * Main application component.
 * This component acts as the root of the application, managing state for dark mode
 * and rendering the CustomNavbar and LandingPage components.
 * @returns {JSX.Element} The main App component.
 */
function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <CustomNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <LandingPage darkMode={darkMode} />
    </div>
  );
}

export default App;