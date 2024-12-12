import React from "react";
import AlbumCollage from "../components/AlbumCollage";
import ArtistCarousel from "../components/ArtistCarousel";

const artists = [
  {
    image: "https://blog.quizur.com/wp-content/uploads/2024/11/txt-with-spray-paint-mgwwwlfbbad8085b.webp",
    name: "Tomorrow X Together"
  }
];

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

const SearchPage = () => {
  return (
    <>
        <div className="mx-auto w-[80%]">
            <h2 className="text-3xl font-semibold text-[#383838] mt-4 mb-2">Artists</h2>
            <hr className="border-[#6d6d6d] border rounded-full" />
        </div>
        <ArtistCarousel artists={artists}/>

        <div className="mx-auto w-[80%]">
            <h2 className="text-3xl font-semibold text-[#383838] mb-2">Albums</h2>
            <hr className="border-[#6d6d6d] border rounded-full" />
        </div>
        <AlbumCollage albums={albums}/>
    </>
  );
};

export default SearchPage;