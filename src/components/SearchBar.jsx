import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [outsideClicked, setOutsideClicked] = useState(false);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  const searchDB = async () => {
    try {
      const response = await fetch(`http://localhost:8000/search?search_query=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSearchedData(data);
      return data;
    } catch (err) {
      console.error("Error fetching search results:", err.message);
      setSearchedData([]); // Clear data on error
    }
  };

  // Debounced Search Function
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 2) {
        searchDB();
      } else {
        setSearchedData([]);
      }
    }, 100); // Delay of 300ms to prevent excessive API calls

    setOutsideClicked(true);

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [query]);



  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setOutsideClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = async () => {
    if (query.length >= 2) {
      if (!searchedData) {
        const data = await searchDB();
        setSearchedData(data);
      }
      navigate("/search", { state: { data: searchedData, query: query} });
    }
    setOutsideClicked(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div ref={searchBarRef} className="relative w-full max-w-md mx-auto my-auto">
      {/* Search Input */}
      <div className="flex items-center bg-white rounded-full py-2 px-4 w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search artists, albums and more..."
          className="flex-grow bg-transparent focus:outline-none text-gray-700"
        />
        <button className="text-gray-500 hover:text-gray-700" onClick={handleSearchSubmit}>
          <SearchIcon className="w-5 h-5 transition-transform duration-300 stroke-[#383838] hover:stroke-gray-400" />
        </button>
      </div>

      {/* Dropdown Results */}
      {outsideClicked && query.length >= 2 && (
        <div className="absolute z-50 mt-2 bg-white shadow-lg rounded-md w-full overflow-hidden">
          {searchedData.length > 0 ? (
          <ul>
            {searchedData.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <span className="text-gray-800">{item.name}</span>
                <img
                  src={item.image_uri}
                  alt={item.name}
                  className={`w-10 h-10 object-cover ${
                    item.obj_type === "release" ? "rounded-md" : "rounded-full"
                  }`}
                />
              </li>
            ))}
          </ul>
          ) : (
            <div className="px-4 py-2 text-gray-500 text-center">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

