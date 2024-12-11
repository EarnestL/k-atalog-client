import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#383838] text-[#EBEBEB] py-4 mt-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-10">
        {/* Brand Name */}
        <div className="text-lg font-bold">
          K-atalog
        </div>

        {/* Links */}
        <div className="flex space-x-6 text-sm">
          <a href="#about" className="hover:text-white transition-colors duration-200">
            About
          </a>
          <a href="#policy" className="hover:text-white transition-colors duration-200">
            Policy
          </a>
          <a href="#contribute" className="hover:text-white transition-colors duration-200">
            Contribute
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
