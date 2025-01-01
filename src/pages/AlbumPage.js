import React, {useState, useEffect, useRef} from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const [layouts, setLayouts] = useState([]);
  const [viewedImage, setViewedImage] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track any errors
  const [photocardSets, setPhotocardSets] = useState([]);
  const [releaseDetails, setReleaseDetails] = useState({});
  const [pobPhotocards, setPobPhotocards] = useState([]);

  const { artist_n_name, release_id } = useParams();

  const baseUri = process.env.REACT_APP_API_BASE_URI;

  const imageRef = useRef(null);
  const [styles, setStyles] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const sourceColorMap = {};
  const sourceColorMapTxt = {};

  const bgColors = ['bg-red-400', 'bg-blue-400', 'bg-amber-400', 'bg-teal-400', 'bg-purple-400', 'bg-orange-400'];
  const txtColors = ['text-red-400', 'text-blue-400', 'text-amber-400', 'text-teal-400', 'text-purple-400', 'text-orange-400'];

  const getColorForSource = (source) => {
    // If the source already has an assigned color, use it
    if (sourceColorMap[source] && sourceColorMapTxt[source]) {
      return [sourceColorMap[source], sourceColorMapTxt[source]];
    }
    // Assign a new color from the list
    const newColor = bgColors[Object.keys(sourceColorMap).length % bgColors.length];
    const newColorTxt = txtColors[Object.keys(sourceColorMapTxt).length % txtColors.length];
    
    sourceColorMap[source] = newColor;
    sourceColorMapTxt[source] = newColorTxt;
    return [newColor, newColorTxt];
  };

  const handleClick = () => {
    if (!isDragging) {
      setViewedImage(null); // Only close modal if not dragging
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0]);
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchStart(null);
    setStyles({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !touchStart) return;

    const image = imageRef.current;
    if (!image) return;

    const { left, top, width, height } = image.getBoundingClientRect();
    const x = e.touches[0].clientX - (left + width / 2);
    const y = e.touches[0].clientY - (top + height / 2);

    const rotateX = -y / height * 15; // Adjust multiplier for sensitivity
    const rotateY = x / width * 15; // Adjust multiplier for sensitivity

    setStyles({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    });
  };

// Disable scroll when modal is open
useEffect(() => {
  if (viewedImage) {
    document.body.style.overflow = "hidden"; // Synchronously disable scroll
  } else {
    document.body.style.overflow = ""; // Restore scroll
  }

  return () => {
    document.body.style.overflow = ""; // Cleanup
  };
}, [viewedImage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Function to determine orientation
  const determineOrientation = (imageSrc) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        // Return true if vertical, false if horizontal
        resolve(img.height > img.width);
      };

      img.onerror = () => {
        reject("Error loading image");
      };
    });
  };

    // Fetch photocards
    useEffect(() => {
      const fetchPhotocards = async () => {
        try {
          const response = await fetch(`${baseUri}/photocards/release/${release_id}`); // Replace with your API URL
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          if (data) {
            console.log(data);
            setPhotocardSets(data['photocard_sets']); // Update state with fetched data
            setPobPhotocards(data['special_photocard_sets']);
            setReleaseDetails(data);
          } else {
            console.warn("No data returned from API");
          }
        } catch (err) {
          setError(err.message); // Capture any errors
        } finally {
          setLoading(false); // Stop loading
        }
      };
  
      fetchPhotocards();
    }, [release_id]); // Empty dependency array ensures this runs only once

  // Initialize layouts when photocardSets is set
  useEffect(() => {
    const initializeLayouts = async () => {
      if (!photocardSets || photocardSets.length === 0) {
        console.warn("Photocard sets are empty, skipping initialization");
        return;
      }

      console.log("Initializing layouts with photocardSets:", photocardSets); // Debugging log

      const newLayouts = await Promise.all(
        photocardSets.map(async (set) => {
          if (!set.photocards || set.photocards.length === 0) {
            console.warn("Empty or missing photocards in set:", set);
            return true; // Default to vertical
          }

          try {
            console.log("Processing photocard image:", set.photocards[0].pc_img); // Debugging log
            return await determineOrientation(set.photocards[0].pc_img);
          } catch (error) {
            console.error(
              "Error in determineOrientation for image:",
              set.photocards[0].pc_img,
              error
            );
            return true; // Default to vertical if error occurs
          }
        })
      );

      console.log("Layouts initialized:", newLayouts); // Debugging log
      setLayouts(newLayouts);
    };

    initializeLayouts();
  }, [photocardSets]);
    
  return (
    <>
    <div>
      {/* Sticky Bar */}
      <div
        className={`fixed left-0 w-full top-[127px] md:top-[72px] z-10 bg-white shadow-md transition-opacity duration-500 ${
          isSticky ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-4xl mx-auto p-4 flex items-center">
          <img
            src={releaseDetails['release_img']}
            alt="Album Cover"
            className="w-12 h-12 mr-4 rounded-md"
          />
          <div>
            <h1 className="text-lg font-bold text-gray-800">{releaseDetails['release_title']}</h1>
            <h2 className="text-sm text-gray-600">{releaseDetails['artist_name']}</h2>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto p-4 flex items-center justify-center md:justify-normal"
      >
        <img
          src={releaseDetails['release_img']}
          className={`bg-gray-300 w-24 h-24 md:w-40 md:h-40 mr-4 md:mr-6 rounded-md ${loading ? 'animate-pulse': ''}`}
        />
        {!loading ?
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">{releaseDetails['release_title']}</h1>
          <h2 className="text-lg md:text-2xl text-gray-600">{releaseDetails['artist_name']}</h2>
          <p className="text-xs md:text-sm text-gray-500">{releaseDetails['release_date']}</p>
        </div> :
        <div>
          <div className="bg-gray-300 w-48 h-5 md:h-7 rounded-md mb-2 animate-pulse"></div>
          <div className="bg-gray-300 w-48 h-5 md:h-7 rounded-md mb-2 animate-pulse"></div>
          <div className="bg-gray-300 w-20 h-3 md:h-4 rounded-md animate-pulse"></div>
        </div>
        }
      </div>
    </div>
          
          
          
          {/* <div className="mt-4">
          <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            'relative block w-full rounded-lg bg-gray-600 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
        >
          {selected.title}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--button-width)] rounded-xl border border-white/5 bg-gray-600 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {versions.map((version) => (
            <ListboxOption
              key={version.title}
              value={version}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{version.title}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div> */}


      <div>
  {loading ? (
    <div className="max-w-4xl mx-auto px-8 py-4 bg-[#faf9f9] text-gray-800 rounded-lg mb-2">
      {/* Skeleton Title */}
      <div className="h-6 w-32 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
      
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {/* Skeleton Cards */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="relative rounded-3xl bg-gray-300 w-full h-48 sm:h-60 md:h-72 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  ) : photocardSets.length==0 ? (
    <div className="max-w-4xl mx-auto px-8 py-4 bg-[#faf9f9] text-gray-800 rounded-lg mb-2">
      <div className="w-full h-48 sm:h-60 md:h-72 rounded-3xl flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-300">No Photocards Available</p>
      </div>
  </div>
  ) : (
    <>
    {photocardSets.map((set, index) => (
      <div key={index} className="max-w-4xl mx-auto px-8 py-4 bg-[#faf9f9] text-gray-800 rounded-lg mb-2">
  
        <h2 className="text-sm font-semibold text-white bg-gray-600 inline-block mb-2 px-3 py-1 rounded-2xl mr-10">
          {set.title}
        </h2>
  
        <div
          className={`grid gap-4 ${
            layouts[index]
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {layouts.length>0 && set.photocards?.map((card) => (
            <div
              key={card.pc_id}
              className={`relative group ${
                layouts[index] ? "aspect-w-5 aspect-h-8" : "aspect-w-8 aspect-h-5"
              } rounded-3xl`}
              onClick={() => setViewedImage(card.pc_img)}
            >
              {/* Image */}
              <img
                src={card.pc_img}
                alt={card.idol_name}
                className="w-full h-full rounded-3xl object-cover transition-transform duration-300 group-hover:scale-105"
              />
  
              {/* Gradient Overlay */}
              <div className="absolute rounded-3xl inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-transform group-hover:scale-105 duration-300"></div>
  
              {/* Information Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-sm font-bold">{card.idol_name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}

    {/* pob section */}
    {pobPhotocards.length>0 && (<div className="max-w-4xl mx-auto px-8 py-4 bg-[#faf9f9] text-gray-800 rounded-lg mb-2">


<h2 className="text-sm font-semibold text-white shadow-lg inline-block mb-4 px-3 py-1 rounded-2xl mr-10 bg-[linear-gradient(to_top_left,_#C9AE5D,_#C9AE5D,_#C9AE5D,_#FFFFFF,_#C9AE5D,_#C9AE5D,_#C9AE5D)] bg-[length:300%_300%] animate-shimmer">
          POBs
        </h2>
  <div
    className={`grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}
  >
    {pobPhotocards?.map((card, index) => {
              const FirstSource = index==0 || pobPhotocards[index].source_description != pobPhotocards[index-1].source_description;
              const [bgColor, txtColor] = getColorForSource(card.source_description);
      return (<div
        key={card.pc_id}
        className={`relative aspect-w-5 aspect-h-8 w-full mb-6 group rounded-3xl`}
        onClick={() => setViewedImage(card.pc_img)}
      >

        {FirstSource && (
        <div className="flex justify-between w-full h-1 mb-4 rounded-full">
          <div className={`w-full ${bgColor} rounded-full mr-2`}/>
          <h1 className={`text-sm -mt-2 font-semibold ${txtColor}`}>{card.source_description}</h1>
          <div className={`w-full ${bgColor} rounded-full ml-2`}/>
        </div>)}

        {!FirstSource && (<div className={`w-full ${bgColor} h-1 mb-4 rounded-full`}></div>)}
        


        {/* Image */}
        <img
          src={card.pc_img}
          alt={card.idol_name}
          className="w-full h-full rounded-3xl object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute -mb-5 rounded-3xl inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-transform group-hover:scale-105 duration-300"></div>

        {/* Information Overlay */}
        <div className="absolute -bottom-5 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-sm font-bold">{card.group_photo ? releaseDetails.artist_name : card.idol_name}</h3>
        </div>
      </div>);
})}
  </div>
</div>)}

    </>
  )}
</div>
      {/* Fullscreen Modal */}
      {viewedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleClick} // Close modal on background click
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          <img
            ref={imageRef}
            src={viewedImage}
            alt="Photocard"
            className="max-w-[80%] max-h-[80%] rounded-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            style={styles}
            draggable="false"       
          />
        </div>

      )}

    </>
  );
};

export default AlbumPage;