import React from "react";
import AlbumCarousel from "../components/AlbumCarousel";

const albums = [
    {
      image: "https://upload.wikimedia.org/wikipedia/en/a/a7/Ros%C3%A9_-_Rosie.png",
      title: "Rosie",
      artist: "Rosé",
      date: "December 6, 2024",
      products: 2,
    },
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
      image: "https://i.scdn.co/image/ab67616d0000b273119800c5fc88785ee3ed1524",
      title: "Drip",
      artist: "Babymonster",
      date: "November 1, 2024",
      products: 11,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/en/9/95/Power_GD_cover.jpg",
      title: "Power",
      artist: "G-Dragon",
      date: "October 31, 2024",
      products: 3,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/en/4/46/Aespa_-_Whiplash.png",
      title: "Wiplash",
      artist: "Aespa",
      date: "October 21, 2024",
      products: 5,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273fc2fffae3025fbc540b98f34",
      title: "I'll Like You",
      artist: "Illit",
      date: "October 21, 2024",
      products: 3,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273f2dff4b6f58682692c0b0beb",
      title: "Eternal",
      artist: "Taemin",
      date: "August 19, 2024",
      products: 4,
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273c9c9aaadb2d6d3d44be06332",
      title: "Fe304: Stick Out",
      artist: "Nmixx",
      date: "August 19, 2024",
      products: 6,
    }
  ];

const LandingPage = () => {
  return (
    <>
        <AlbumCarousel albums={albums} title={'New Releases'}/>
    </>
  );
};

export default LandingPage;
