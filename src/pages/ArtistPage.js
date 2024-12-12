import React, {useEffect, useState} from "react";
import AlbumCollage from "../components/AlbumCollage";

const albums = [
    {
        image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
        title: "The Star Chapter: Santuary",
        artist: "Tomorrow X Together",
        date: "November 4, 2024",
        products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b27303c996028737858321d2ffe0",
      title: "minisode 3: TOMORROW",
      artist: "Tomorrow X Together",
      date: "April 4, 2024",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b27394b9645bc6a7f821ce834abd",
      title: "Sweet",
      artist: "Tomorrow X Together",
      date: "July 5, 2023",
      products: 6,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/en/f/f2/TXT_-_The_Name_Chapter_Temptation.png",
      title: "The Name Chapter: TEMPTATION",
      artist: "Tomorrow X Together",
      date: "January 27, 2023",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b2736067880e6c410727ac5a5f8b",
      title: "The Name Chapter: FREEFALL",
      artist: "Tomorrow X Together",
      date: "October 13, 2022",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b27313ac5d67675999ba7b9c4f21",
      title: "minisode 2: Thursday's Child",
      artist: "Tomorrow X Together",
      date: "May 9, 2022",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b2735137378ed49327e5dec7406f",
      title: "The Chaos Chapter: FIGHT OR ESCAPE",
      artist: "Tomorrow X Together",
      date: "August 17, 2021",
      products: 6,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/en/6/6a/The_Chaos_Chapter_-_Freeze.png",
      title: "The Chaos Chapter: FREEZE",
      artist: "Tomorrow X Together",
      date: "May 31, 2021",
      products: 6,
    },
    {
      image: "https://m.media-amazon.com/images/I/A1uJXG2pnvL._UF1000,1000_QL80_.jpg",
      title: "Still Dreaming",
      artist: "Tomorrow X Together",
      date: "January 20, 2021",
      products: 6,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/en/e/e0/Minisode1_-_Blue_Hour.jpg",
      title: "minisode 1: Blue Hour",
      artist: "Tomorrow X Together",
      date: "October 26, 2020",
      products: 6,
    },
    {
        image: "https://m.media-amazon.com/images/I/618OFQdiygL._UF1000,1000_QL80_.jpg",
        title: "The Dream Chapter: ETERNITY",
        artist: "Tomorrow X Together",
        date: "May 18, 2020",
        products: 6,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/en/7/79/TXT_-_The_Dream_Chapter_-_Magic.png",
        title: "The Dream Chapter: MAGIC",
        artist: "Tomorrow X Together",
        date: "October 21, 2019",
        products: 6,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/The_Dream_Chapter_Star.png",
        title: "The Dream Chapter: STAR",
        artist: "Tomorrow X Together",
        date: "March 4, 2019",
        products: 6,
    }
  ];

  const AlbumPage = () => {

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          // Check if the scroll position has reached the sticky title
          const stickyElement = document.getElementById("sticky-title");
          const offset = stickyElement?.offsetTop || 0;
          setIsSticky(window.scrollY >= offset - 24);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
      <div className="relative">
  
        {/* Banner Section */}
        <div className="fixed w-full h-[100px] md:h-[300px]">
          <img
            src="https://media.discordapp.net/attachments/990030748201402401/1316648428779999262/image_21.png?ex=675bcfe7&is=675a7e67&hm=ce2f1a67e00becdab99b8a97beff930b939488164495655d0d2ad37cc891c087&=&format=webp&quality=lossless"
            alt="Artist Banner"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        
        {/* Banner Section */}
        <div className="relative w-full h-[100px] md:h-[300px]">
            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
        </div>
  
        {/* Sticky Title */}
        <div id="sticky-title" className="sticky top-[127px] md:top-[72px] z-10 -mt-16 mb-6 py-4">
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${ isSticky ? "opacity-60" : "opacity-0"}`}></div>
        <h2 className="relative pl-4 md:pl-10 text-xl md:text-4xl font-extrabold text-[#EBEBEB]">
            Tomorrow X Together
          </h2>
        </div>

        {/* Album Collage */}
        <div className="relative bg-[#EBEBEB] md:-mt-8">
            <AlbumCollage albums={albums} />
        </div>
      </div>
    );
  };

export default AlbumPage;

