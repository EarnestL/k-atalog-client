import React, {useState, useEffect} from "react";
import AlbumCarousel from "../components/AlbumCarousel";

const LandingPage = () => {

  const [albums, setAlbums] = useState([]); // State to hold the albums data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track any errors

  // Fetch albums data from API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://localhost:8000/album/releases"); // Replace with your API URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAlbums(data); // Update the albums state with fetched data
      } catch (err) {
        setError(err.message); // Capture any errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAlbums();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <>
        <AlbumCarousel albums={albums} title={'New Releases'}/>
    </>
  );
};

export default LandingPage;
