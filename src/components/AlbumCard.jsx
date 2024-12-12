import React from "react";

const AlbumCard = ({ image, title, artist, date, products }) => {

  const handleClick = () => {
    console.log("Album clicked:", title);
  };

  return (
    <div className="bg-white shadow-lg md:w-[250px] w-[150px] flex-shrink-0 my-4 group rounded-md" onClick={handleClick}>
      {/* Album Image */}
      <img src={image} alt={title} className="w-full md:h-[250px] h-[150px] object-cover scale-95 transform transition-transform duration-300 group-hover:scale-100" />
      
      {/* Album Details */}
      <div className="p-4 text-xs md:text-sm">
        <h3 className="text-base md:text-lg font-bold text-[#383838] line-clamp-2 leading-none">{title}</h3>
        <p className="font-semibold text-[#383838] mb-2 truncate">{artist}</p>
        <p className="font-semibold text-[#919191]">{date}</p>
        <p className="font-semibold text-[#919191]">{products} Products</p>
      </div>
    </div>
  );
};

export default AlbumCard;
