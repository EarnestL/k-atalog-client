import React from "react";

const ArtistBubble = ({ image, name }) => {

  return (
    <div className="md:w-[200px] w-[150px] flex flex-col items-center flex-shrink-0 mt-4 group">
      <img src={image} alt={name} className="w-full md:h-[200px] h-[150px] rounded-full object-cover scale-95 mb-2 md:mb-1 transform transition-transform duration-300 group-hover:scale-100" />
      <h3 className="text-sm md:text-lg font-bold text-[#383838] line-clamp-2 leading-none">{name}</h3>
    </div>
  );
};

export default ArtistBubble;