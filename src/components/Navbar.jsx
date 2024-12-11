import React, {useState, useEffect} from 'react';
import { ReactComponent as ArrowIcon } from '../assets/arrowIcon.svg';
import { ReactComponent as SearchIcon } from '../assets/searchIcon.svg'

const Navbar = () => {


  let user_id = "afasfasdfas";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect (() => {
      if (user_id) {
          setIsLoggedIn(true);
      } else {
          setIsLoggedIn(false);
      }
  }, [user_id]);

  useEffect (() => {
      if (isDropDownOpen) {
          console.log("dropdown is open");
      } else {
          console.log("dropdown is closed");
      }
  }, [isDropDownOpen]);
  
  return (
    <nav className="sticky top-0 bg-[#383838] shadow-lg z-10">
      <div className="flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-white flex-shrink-0 ml-10">
          K-atalog
        </div>

        {/* Search Bar */}
        <div className="flex-grow flex justify-center order-last w-full md:order-none md:w-auto md:py-4 pb-4 mx-4">
          <div className="flex items-center bg-white rounded-full py-2 px-4 w-full md:w-[60%]">
            <input
              type="text"
              placeholder="Search artists, albums and more..."
              className="flex-grow bg-transparent focus:outline-none text-gray-700"
            />
            <button className="text-gray-500 hover:text-gray-700">
            <SearchIcon
              className={`w-5 h-5 transition-transform duration-300 stroke-[#383838] hover:stroke-gray-400`}
            />
            </button>
          </div>
        </div>

        <div
          className="relative flex items-center space-x-4 flex-shrink-0"
          onMouseEnter={() => setIsDropDownOpen(true)}
          onMouseLeave={() => setIsDropDownOpen(false)}
        >
          {/* Account Button */}
          <div
            className={`flex items-center text-[#EBEBEB] cursor-pointer py-4 mr-10 ${
            isDropDownOpen ? "font-semibold" : ""
            }`}
          >
            {isLoggedIn ? (
              <>
               <span className="w-[70px] text-center py-2">Account</span>
               <ArrowIcon
                 className={`w-5 h-5 transition-transform duration-300 stroke-[#EBEBEB] ${
                    isDropDownOpen ? "" : "rotate-180"
                 }`}
                />
              </>
              ) : (
              "Log In"
            )}
          </div>

          {/* Dropdown Menu */}
          {isLoggedIn && isDropDownOpen && (
           <div className="absolute top-full bg-[#383838] shadow-lg w-40 text-[#EBEBEB] z-50 right-3">
             <ul>
               <li className="px-4 py-3 hover:bg-gray-900 cursor-pointer text-[#EBEBEB] hover:text-white">
                  Settings
                </li>
               <li className="px-4 py-3 hover:bg-gray-900 cursor-pointer text-[#EBEBEB] hover:text-red-700 hover:font-semibold">
                 Sign Out
               </li>
              </ul>
           </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
