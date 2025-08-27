import React, { useState, useEffect } from "react";
import CustomNavbar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import "./index.css";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply Tailwind dark class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <CustomNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <LandingPage darkMode={darkMode} />
      <Footer darkMode={darkMode}/>
    </div>
  );
}

export default App;
