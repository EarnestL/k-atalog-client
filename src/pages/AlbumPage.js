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
  
  const { artist_n_name, release_id } = useParams();

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
          const response = await fetch(`http://localhost:8000/photocards/release/${release_id}`); // Replace with your API URL
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          if (data && data.length > 0) {
            setPhotocardSets(data); // Update state with fetched data
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
    }, []); // Empty dependency array ensures this runs only once


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
            src={photocardSets.length>0 ? photocardSets[0]['release_img'] : ''}
            alt="Album Cover"
            className="w-12 h-12 mr-4 rounded-md"
          />
          <div>
            <h1 className="text-lg font-bold text-gray-800">minisode 1: Blue Hour</h1>
            <h2 className="text-sm text-gray-600">Tomorrow X Together</h2>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto p-4 flex items-center justify-center md:justify-normal"
      >
        <img
          src={photocardSets.length>0 ? photocardSets[0]['release_img'] : ''}
          alt="Album Cover"
          className="w-24 h-24 md:w-40 md:h-40 mr-4 md:mr-6 rounded-md"
        />
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">{photocardSets.length>0 ? photocardSets[0]['release_title'] : '-'}</h1>
          <h2 className="text-lg md:text-2xl text-gray-600">{photocardSets.length>0 ? photocardSets[0]['group_name'] : '-'}</h2>
          <p className="text-xs md:text-sm text-gray-500">{photocardSets.length>0 ? photocardSets[0]['release_date'] : '-'}</p>
        </div>
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
  {photocardSets.map((set, index) => (
    <div key={index} className="max-w-4xl mx-auto px-8 py-4 bg-[#faf9f9] text-gray-800 rounded-lg mb-2">

      <h2 className="text-sm font-semibold text-white bg-gray-600 inline-block mb-2 px-3 py-1 rounded-2xl mr-10">
        {set.title}
      </h2>

      <div
        className={`grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] ${
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
</div>
      {/* Fullscreen Modal */}
      {viewedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setViewedImage(null)} // Close modal on background click
        >
          <img
            src={viewedImage}
            alt="Photocard"
            className="max-w-[80%] max-h-[80%] rounded-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          />
        </div>
      )}

    </>
  );
};

export default AlbumPage;