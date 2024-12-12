import React, { useRef, useState, useEffect } from "react";
import ArtistBubble from "./ArtistBubble";
import { ReactComponent as RightScroll } from '../assets/rightScrollIcon.svg';
import { ReactComponent as LeftScroll } from '../assets/leftScrollIcon.svg'

const ArtistCarousel = ({artists}) => {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bubblesCount, setBubblesCount] = useState(0);

  // Calculate the number of scrollable sections
  useEffect(() => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;;
      const totalScrollWidth = scrollRef.current.scrollWidth;
      const scrollableSections = Math.ceil(totalScrollWidth / containerWidth);
      setBubblesCount(scrollableSections);
    }
  }, [artists]);

    // Scroll the container left
    const scrollLeft = () => {
        const containerWidth = scrollRef.current.offsetWidth;;
      scrollRef.current.scrollBy({
        left: -containerWidth, // Adjust scroll distance
        behavior: "smooth",
      });
      setCurrentIndex(currentIndex -1);
    };
  
    // Scroll the container right
    const scrollRight = () => {
        const containerWidth = scrollRef.current.offsetWidth;;
      scrollRef.current.scrollBy({
        left: containerWidth, // Adjust scroll distance
        behavior: "smooth",
      });
      setCurrentIndex(currentIndex +1);
    };

  return (
    <div className="flex w-full max-w-[90%] mx-auto md:max-w-[80%] mt-2">

      <button onClick={scrollLeft} disabled={currentIndex === 0}>
        <LeftScroll
          className={`hidden md:block -translate-y-1/2 z-10 w-50 h-50 mr-2 ${currentIndex === 0 ? 'stroke-none' : 'stroke-[#383838] hover:stroke-[#9e9e9e]'}`}>
        </LeftScroll>
      </button>

      {/* Scrollable Container */}
      <div ref={scrollRef} className={`mx-4 md:mx-0 flex overflow-x-auto space-x-6 scrollbar-hide mb-4 ${artists.length <= 5 ? 'md:justify-center' : ''} ${artists.length <= 2 ? 'justify-center' : ''}`}>
        {artists.map((artist, index) => (
          <ArtistBubble
            key={index}
            image={artist.image}
            name={artist.name}
          />
        ))}
      </div>

      <button onClick={scrollRight} disabled={currentIndex === bubblesCount-1}>
        <RightScroll
          className={`hidden md:block -translate-y-1/2 z-10 w-50 h-50 ml-2 ${currentIndex === bubblesCount-1 ? 'stroke-none' : 'stroke-[#383838] hover:stroke-[#9e9e9e]'}`}>
        </RightScroll>
      </button>


    </div>
  );
};

export default ArtistCarousel;


