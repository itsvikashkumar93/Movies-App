import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

const Cards = ({ data, title }) => {
  // console.log(data, title);

  return (
    <div className="w-full h-full px-10 py-6  flex flex-wrap gap-5 justify-between bg-[#1F1E24]">
      {data.map((elem, i) => (
        <Link
          to={`/${elem.media_type || title}/details/${elem.id}`}
          key={i}
          className="relative w-[17vw] my-3 shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] shrink-0"
        >
          <img
            src={
              elem.poster_path || elem.backdrop_path || elem.profile_path
                ? `https://image.tmdb.org/t/p/original${
                    elem.poster_path || elem.backdrop_path || elem.profile_path
                  }`
                : noimage
            }
            alt=""
            className="w-full h-[48vh] object-cover rounded-t"
          />
          <h1 className="p-2 text-xl font-semibold hover:text-red-500">
            {elem.title || elem.name}
          </h1>
          {elem.vote_average && (
            <span className="absolute bottom-[35%] -right-[10%] font-semibold text-lg bg-yellow-600 flex items-center justify-center inline-block h-[7vh] w-[7vh] rounded-full  ">
              {(elem.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
