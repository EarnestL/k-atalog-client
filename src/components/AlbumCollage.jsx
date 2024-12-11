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
                    image={album.image}
                    title={album.title}
                    artist={album.artist}
                    date={album.date}
                    products={album.products}
                />
            ))}
        </div>
    </div>
  );
};

export default AlbumCollage;
