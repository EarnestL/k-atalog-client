import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumCard = ({ album_image, release_title, release_id, artist_name, artist_n_name, release_date, product_count }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${artist_n_name}/${release_id}`);
  };

  return (
    <div className="bg-white shadow-lg md:w-[250px] w-[150px] flex-shrink-0 my-4 group rounded-md" onClick={handleClick}>
      {/* Album Image */}
      <img src={album_image} alt={release_title} className="w-full md:h-[250px] h-[150px] object-cover scale-95 transform transition-transform duration-300 group-hover:scale-100" />
      
      {/* Album Details */}
      <div className="p-4 text-xs md:text-sm">
        <h3 className="text-base md:text-lg font-bold text-[#383838] line-clamp-2 leading-none">{release_title}</h3>
        <p className="font-semibold text-[#383838] mb-2 truncate">{artist_name}</p>
        <p className="font-semibold text-[#919191]">{release_date}</p>
        <p className="font-semibold text-[#919191]">{product_count} Products</p>
      </div>
    </div>
  );
};

export default AlbumCard;
