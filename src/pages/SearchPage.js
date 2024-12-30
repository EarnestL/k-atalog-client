import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const items = location.state?.data || []; 
  const query = location.state?.query || null;
  const navigate = useNavigate();

  const handleGroupClick = (id, n_name) => {
    console.log(id);
    navigate(`/${n_name}`, { state: { id: id} });
  };
  const handleIdolClick = () => {
    console.log("idol clicked");
  };
  const handleReleaseClick = () => {
    console.log("release clicked");
  };

  return (
    <div className="mx-auto w-[80%]">
      <h2 className="text-3xl font-semibold text-[#383838] mt-4 mb-2">Exploring {query}..</h2>
      <hr className="border-[#6d6d6d] border rounded-full mb-4" />

      {/* Unified Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
        {items.map((item, index) =>
          item.obj_type === "group" || item.obj_type === "idol" ? (
            <div
              key={index}
              onClick={
                item.obj_type === "group" ? () => handleGroupClick(item.id, item.n_name) : () => handleIdolClick()
              }
              className="md:w-[260px] w-[160px] rounded-lg bg-black bg-opacity-0 transition-all duration-100 ease-in hover:bg-opacity-10 flex flex-col items-center justify-between"
            >
              <div className="md:w-[220px] w-[120px] flex-shrink-0 my-4 group">
                {/* Artist Image */}
                <img
                  src={item.image_uri}
                  alt={item.name}
                  className="w-full md:h-[220px] h-[120px] object-cover rounded-full transform transition-transform duration-300 group-hover:scale-105"
                />

                {/* Artist Details */}
                <div className="mt-2 text-xs md:text-sm">
                  <h3 className="text-base md:text-lg font-bold text-[#383838] line-clamp-2 leading-none">
                    {item.name}
                  </h3>
                  <p className="font-semibold text-[#383838] truncate">Artist</p>
                </div>
              </div>
            </div>
          ) : item.obj_type === "release" ? (
            <div
              key={index}
              onClick={handleReleaseClick}
              className="md:w-[260px] w-[160px] rounded-lg bg-black bg-opacity-0 transition-all duration-100 ease-in hover:bg-opacity-10 flex flex-col items-center justify-between"
            >
              <div className="md:w-[220px] w-[120px] flex-shrink-0 my-4 group">
                {/* Album Image */}
                <img
                  src={item.image_uri}
                  alt={item.name}
                  className="w-full md:h-[220px] h-[120px] object-cover rounded-md transform transition-transform duration-300 group-hover:scale-105"
                />

                {/* Album Details */}
                <div className="mt-2 text-xs md:text-sm">
                  <h3 className="text-base md:text-lg font-bold text-[#383838] line-clamp-2 leading-none">
                    {item.name}
                  </h3>
                  <p className="font-semibold text-[#383838] truncate">Album</p>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default SearchPage;
