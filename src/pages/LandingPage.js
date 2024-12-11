import React from "react";
import AlbumCarousel from "../components/AlbumCarousel";

const albums = [
    {
      image: "https://images.genius.com/966fb868d3b8c03bedb6c5dacadab0d7.1000x1000x1.png",
      title: "Strategy",
      artist: "Twice",
      date: "December 6, 2024",
      products: 3,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b2739a7d96c7962d39fccda354ea",
      title: "Golden Hour: Part 2",
      artist: "Ateez",
      date: "November 15, 2024",
      products: 11,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b2735a7b804c17c84c32fe1bb1ce",
      title: "Dream()scape",
      artist: "Nct Dream",
      date: "November 11, 2024",
      products: 11,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/en/d/d3/Stray_Kids_-_Giant.png",
      title: "Giant",
      artist: "Stray Kids",
      date: "November 13, 2024",
      products: 11,
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
    // Add more albums as needed
  ];

const LandingPage = () => {
  return (
    <>
        <AlbumCarousel albums={albums} title={'New Releases'}/>
    </>
  );
};

export default LandingPage;
