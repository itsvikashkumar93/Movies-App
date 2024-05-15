import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";
function HorizontalCards({ data, p = 0 }) {
  return (
    <div
      style={{ padding: `0 ${p}vw` }}
      className="w-full text-white flex gap-2 sm:gap-5 overflow-x-auto overflow-y-hidden"
    >
      {data.length > 0 ? (
        data.map((elem, i) => (
          <Link
            to={`/${elem.media_type}/details/${elem.id}`}
            key={i}
            className="h-[45vh] w-[60vw] sm:h-[42vh] sm:w-[15vw] bg-zinc-700 shrink-0 rounded overflow-y-hidden sm:overflow-y-auto"
          >
            <img
              src={
                elem.backdrop_path || elem.poster_path
                  ? `https://image.tmdb.org/t/p/original${
                      elem.backdrop_path || elem.poster_path
                    }`
                  : noimage
              }
              alt=""
              className="w-full h-[60%] object-cover"
            />

            <div className="w-full py-3 px-2">
              <h1 className="text-xl leading-none sm:leading-[1.6vw] font-semibold">
                {elem.title || elem.name}
              </h1>
              <p className="mt-1 text-sm text-zinc-200">
                {elem.overview.slice(0, 50)}
                <span className="text-zinc-400"> ...more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-bold text-center uppercase">
          Nothing to show
        </h1>
      )}
    </div>
  );
}

export default HorizontalCards;
