import React from "react";
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
      image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
      title: "The Star Chapter: Santuary",
      artist: "Tomorrow X Together",
      date: "November 4, 2024",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
      title: "The Star Chapter: Santuary",
      artist: "Tomorrow X Together",
      date: "November 4, 2024",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
      title: "The Star Chapter: Santuary",
      artist: "Tomorrow X Together",
      date: "November 4, 2024",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
      title: "The Star Chapter: Santuary",
      artist: "Tomorrow X Together",
      date: "November 4, 2024",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
      title: "The Star Chapter: Santuary",
      artist: "Tomorrow X Together",
      date: "November 4, 2024",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
      title: "The Star Chapter: Santuary",
      artist: "Tomorrow X Together",
      date: "November 4, 2024",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
      title: "The Star Chapter: Santuary",
      artist: "Tomorrow X Together",
      date: "November 4, 2024",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
      title: "The Star Chapter: Santuary",
      artist: "Tomorrow X Together",
      date: "November 4, 2024",
      products: 6,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
      title: "The Star Chapter: Santuary",
      artist: "Tomorrow X Together",
      date: "November 4, 2024",
      products: 6,
    },
    {
        image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
        title: "The Star Chapter: Santuary",
        artist: "Tomorrow X Together",
        date: "November 4, 2024",
        products: 6,
    },
    {
        image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
        title: "The Star Chapter: Santuary",
        artist: "Tomorrow X Together",
        date: "November 4, 2024",
        products: 6,
    },
    {
        image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
        title: "The Star Chapter: Santuary",
        artist: "Tomorrow X Together",
        date: "November 4, 2024",
        products: 6,
    },
    {
        image: "https://i.scdn.co/image/ab67616d0000b273b612b8d797e8e3ec375ca60d",
        title: "The Star Chapter: Santuary",
        artist: "Tomorrow X Together",
        date: "November 4, 2024",
        products: 6,
    }
  ];

const SearchPage = () => {
  return (
    <>
        <div className="mx-auto w-[80%]">
            <h2 className="text-3xl font-semibold text-[#383838] mb-2">Artists</h2>
            <hr className="border-[#6d6d6d] border rounded-full" />
        </div>

        <div className="mx-auto w-[80%]">
            <h2 className="text-3xl font-semibold text-[#383838] mb-2">Albums</h2>
            <hr className="border-[#6d6d6d] border rounded-full" />
        </div>
        <AlbumCollage albums={albums}/>
    </>
  );
};

export default SearchPage;