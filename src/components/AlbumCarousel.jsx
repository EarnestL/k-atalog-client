import React, { useRef, useState, useEffect } from "react";
import AlbumCard from "./AlbumCard";
import { ReactComponent as RightScroll } from '../assets/rightScrollIcon.svg';
import { ReactComponent as LeftScroll } from '../assets/leftScrollIcon.svg'

const AlbumCarousel = ({ albums, title}) => {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bubblesCount, setBubblesCount] = useState(0);

  // Calculate the number of scrollable sections
  useEffect(() => {
    if (scrollRef.current) {
      const containerWidth = 1320;
      const totalScrollWidth = scrollRef.current.scrollWidth;
      const scrollableSections = Math.ceil(totalScrollWidth / containerWidth);
      setBubblesCount(scrollableSections);
    }
  }, [albums]);

    // Scroll the container left
    const scrollLeft = () => {
        const containerWidth = 1320;
      scrollRef.current.scrollBy({
        left: -containerWidth, // Adjust scroll distance
        behavior: "smooth",
      });
      setCurrentIndex(currentIndex -1);
    };
  
    // Scroll the container right
    const scrollRight = () => {
        const containerWidth = 1320;
      scrollRef.current.scrollBy({
        left: containerWidth, // Adjust scroll distance
        behavior: "smooth",
      });
      setCurrentIndex(currentIndex +1);
    };

  return (
    <div className="w-full max-w-[90%] mx-auto md:max-w-[80%] mt-4">
        
      {/* Banner */}
      <div className="bg-[#383838] text-white px-4 py-2 inline-block"
        style={{clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)"}}
      >
        <h2 className="text-base md:text-lg font-bold pr-2">{title}</h2>
      </div>

      {/* Scrollable Container */}
      <div ref={scrollRef} className={`flex overflow-x-auto space-x-4 scrollbar-hide mb-4 ${albums.length <= 5 ? 'md:justify-center' : ''} ${albums.length <= 2 ? 'justify-center' : ''}`}>
        {albums.map((album, index) => (
          <AlbumCard
            key={index}
            image={album.image}
            title={album.title}
            artist={album.artist}
            date={album.date}
            products={album.products}
          />
        ))}
      </div>

      {/* Scroll Buttons */}
      <div className="hidden md:flex justify-between">
        <button onClick={scrollLeft} disabled={currentIndex === 0}>
            <LeftScroll
                className={`top-1/2 -translate-y-1/2 z-10 hover:stroke-[#9e9e9e] w-50 h-50 ${currentIndex === 0 ? 'stroke-[#9e9e9e]' : 'stroke-[#383838]'}`}>
            </LeftScroll>
        </button>

      {/* Pagination Bubbles */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: bubblesCount }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-[#383838]" : "bg-gray-300"
            } transition-colors duration-300`}
          ></div>
        ))}
      </div>
        <button onClick={scrollRight} disabled={currentIndex === bubblesCount-1}>
            <RightScroll
                className={`top-1/2 -translate-y-1/2 z-10 hover:stroke-[#9e9e9e] w-50 h-50 ${currentIndex === bubblesCount-1 ? 'stroke-[#9e9e9e]' : 'stroke-[#383838]'}`}>
            </RightScroll>
        </button>

      </div>


    </div>
  );
};

export default AlbumCarousel;


