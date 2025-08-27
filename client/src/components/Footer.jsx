// client/src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="py-12  bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4 items-center">
          {/* Left Side */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <i className="bi bi-heart-pulse-fill text-red-500 text-2xl" />
              <strong className="text-xl">Migrant Health</strong>
            </div>
            <p className="text-sm mb-1">
              © {new Date().getFullYear()} Migrant Health. All rights reserved.
            </p>
            <p className="text-sm mb-0">
              Built with React, Tailwind CSS, Chart.js & Three.js.
            </p>
          </div>

          {/* Right Side */}
          <div className="col-span-1 text-left md:text-right">
            <a
              href="#features"
              className="mr-4 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#stats"
              className="mr-4 hover:text-white transition-colors"
            >
              Stats
            </a>
            <a
              href="#signin"
              className="hover:text-white transition-colors"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
