import React from "react";
import AlbumCard from "./AlbumCard"

const AlbumCollage = ({ albums }) => {
  return (
    <div className="flex justify-center">
        {/* Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-x-6">
            {albums.map((album, index) => (
                <AlbumCard
                    key={index}
                    album_image={album.album_image}
                    release_id={album.release_id}
                    release_title={album.release_title}
                    artist_name={album.artist_name}
                    artist_n_name={album.artist_n_name}
                    release_date={album.release_date}
                    product_count={album.product_count}
                />
            ))}
        </div>
    </div>
  );
};

export default AlbumCollage;
