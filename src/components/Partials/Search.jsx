import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

function Search({ width }) {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  // console.log(query);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(data.results);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  // console.log(typeof width);

  return (
    <div
      style={{ width: `${width}vw` }}
      className="relative flex items-center justify-center z-[99]"
    >
      <i className="absolute left-[-7%] ri-search-line text-white text-2xl"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-full px-5 py-2 text-zinc-200 text-lg outline-none bg-zinc-800 rounded "
        placeholder="Search anything..."
        type="text"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="ri-close-line absolute right-[-7%] text-white text-2xl cursor-pointer"
        ></i>
      )}

      <div className="absolute w-full max-h-[50vh] left-1/2 -translate-x-[50%] text-zinc-100 bg-zinc-800 rounded top-[115%] px-5 flex flex-col  overflow-y-auto">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="w-full h-[15vh] my-2 bg-[#1F1E24] hover:bg-[#25222a] rounded px-3 py-2 flex gap-5 items-center shrink-0"
          >
            <img
              src={
                s.posters_path || s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original${
                      s.backdrop_path || s.profile_path || s.posters_path
                    }`
                  : noimage
              }
              alt=""
              className={`${
                width === 40 ? "w-[18%]" : "w-[21%]"
              } h-full bg-zinc-500 object-cover object-top rounded`}
            />
            <span className="text-xl inline-block w-[80%]">
              {s.title || s.original_title || s.name || s.original_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
