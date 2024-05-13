import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || wallpaper.poster_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
      }}
      className="py-1 px-8 text-white w-full h-[55vh] bg-zinc-700 "
    >
      <h1 className="mt-[12%] text-[3vw] leading-none font-bold">
        {data.title || data.name}
      </h1>
      <p className="w-[60%] mt-2 text-lg">
        {data.overview.slice(0, 150)}
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          {" "}
          ...more
        </Link>
      </p>
      <div className="flex gap-5 mt-2">
        <p className="flex gap-1 items-center">
          <i className="ri-megaphone-line text-yellow-300 text-xl"></i>
          {data.release_date || "No Information"}
        </p>
        <p className="flex gap-1 items-center">
          <i className="ri-album-line text-yellow-300 text-xl"></i>
          {data.media_type.toUpperCase()}
        </p>
      </div>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="bg-[#6556CD] mt-3 rounded inline-block px-3 py-2 "
      >
        Watch Trailer
      </Link>
    </div>
  );
}

export default Header;
