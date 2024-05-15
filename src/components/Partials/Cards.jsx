import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

const Cards = ({ data, title }) => {
  // console.log(data, title);

  return (
    <div className="w-full h-full px-2 py-1 sm:px-10 sm:py-6 flex flex-wrap gap-1 overflow-x-hidden sm:gap-5 justify-between bg-[#1F1E24]">
      {data.map((elem, i) => (
        <Link
          to={`/${elem.media_type || title}/details/${elem.id}`}
          key={i}
          className="relative w-[47vw] sm:w-[17vw] my-1 sm:my-3 shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] shrink-0"
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
            className="w-full h-[35vh] sm:h-[48vh] object-top sm:object-center object-cover rounded-t"
          />
          <h1 className="p-1 h-16 sm:h-[9vh] overflow-hidden sm:p-2 text-lg sm:text-xl font-semibold hover:text-red-500">
            {elem.title || elem.name}
          </h1>
          {elem.vote_average * 10 > 0 && (
            <span className="absolute bottom-[17%] right-[0] sm:bottom-[35%] sm:-right-[10%] font-semibold sm:text-lg bg-yellow-600 flex items-center justify-center inline-block h-[6vh] w-[6vh] sm:h-[7vh] sm:w-[7vh] rounded-full  ">
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
