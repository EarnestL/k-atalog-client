import React, {useEffect, useState} from "react";
import AlbumCollage from "../components/AlbumCollage";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

  const ArtistPage = () => {
    const [albums, setAlbums] = useState([]); // State to hold the albums data
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track any errors
    const [bannerImg, setBannerImg] = useState(null);

    const location = useLocation();
    const { group_n_name } = useParams();
    const id = location.state?.id || null;

    const baseUri = process.env.REACT_APP_API_BASE_URI;

    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {

      const fetchAlbums = async () => {
        try {
          const response = await fetch(`${baseUri}/album/releases?${id!==null?`group_id=${id}`:''}&group_n_name=${group_n_name}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setAlbums(data); // Update the albums state with fetched data
          setBannerImg(data[0]['artist_banner']);
        } catch (err) {
          setError(err.message); // Capture any errors
        } finally {
          setLoading(false); // Stop loading
        }
      };
      fetchAlbums();

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

      
    }, [group_n_name]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="relative">
  
        {/* Banner Section */}
        <div className="fixed w-full h-[100px] md:h-[300px]">
          <img
            src={bannerImg}
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
          {albums[0]['artist_name']}
          </h2>
        </div>

        {/* Album Collage */}
        <div className="relative bg-[#EBEBEB] md:-mt-8">
            <AlbumCollage albums={albums} />
        </div>
      </div>
    );
  };

export default ArtistPage;

