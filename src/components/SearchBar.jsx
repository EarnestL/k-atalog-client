import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as SearchIcon } from '../assets/searchIcon.svg';

const albums = [
  {
    id: 1,
    title: "minisode 1: Blue Hour",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e0/Minisode1_-_Blue_Hour.jpg",
    type: "album"
  },
  {
    id: 2,
    title: "minisode 2: Thursday’s Child",
    image: "https://i.scdn.co/image/ab67616d0000b27313ac5d67675999ba7b9c4f21",
    type: "album"
  },
  {
    id: 3,
    title: "minisode 3: Tomorrow",
    image: "https://i.scdn.co/image/ab67616d0000b27303c996028737858321d2ffe0",
    type: "album"
  },
  {
    id: 4,
    title: "Tomorrow X Together",
    image: "https://blog.quizur.com/wp-content/uploads/2024/11/txt-with-spray-paint-mgwwwlfbbad8085b.webp",
    type: "artist"
  },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchBarRef = useRef(null);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setFilteredAlbums([]);
      setIsDropdownVisible(false);
    } else {
      setFilteredAlbums(
        albums.filter((album) =>
          album.title.toLowerCase().includes(searchQuery)
        )
      );
    }
    setIsDropdownVisible(true);
  };

  const handleClickOutside = (event) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="relative w-full max-w-md mx-auto my-auto">
      {/* Search Input */}
      <div className="flex items-center bg-white rounded-full py-2 px-4 w-full">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search artists, albums and more..."
              className="flex-grow bg-transparent focus:outline-none text-gray-700"
            />
            <button className="text-gray-500 hover:text-gray-700">
            <SearchIcon
              className={`w-5 h-5 transition-transform duration-300 stroke-[#383838] hover:stroke-gray-400`}
            />
            </button>
      </div>

      {/* Dropdown Results */}
      {isDropdownVisible && filteredAlbums.length > 0 && (
        <div className="absolute z-50 mt-2 bg-white shadow-lg rounded-md w-full overflow-hidden">
          <ul>
            {filteredAlbums.map((album) => (
              <li
                key={album.id}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <span className="text-gray-800">{album.title}</span>
                <img
                  src={album.image}
                  alt={album.title}
                  className={`w-10 h-10 object-cover ${album.type === 'artist' ? 'rounded-full' : 'rounded-md'}`}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
