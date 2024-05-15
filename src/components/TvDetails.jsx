import React, { useEffect } from "react";
import { asyncloadTv } from "../store/actions/tvActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import HorizontalCards from "./Partials/HorizontalCards";
import Loading from "./Loading";
import { removeTv } from "../store/reducers/tvSlice";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.tv);
  // console.log(info);

  useEffect(() => {
    dispatch(asyncloadTv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id]);
  return info ? (
    <div
      className="relative w-full h-screen text-zinc-100 pt-5 px-1 sm:p-10 sm:px-28 overflow-y-auto"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),url(https://image.tmdb.org/t/p/original${
          info.detail.backdrop_path || info.detail.poster_path
        })`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}
    >
      {/* Part-1 Navbar */}
      <nav className="w-full flex gap-5 items-center">
        <i
          className="ri-arrow-left-line text-xl hover:text-[#6556CD] cursor-pointer"
          onClick={() => navigate(-1)}
        ></i>

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line text-xl hover:text-[#6556CD]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i className="ri-earth-line text-xl hover:text-[#6556CD]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}
        >
          <img
            className="w-9"
            src="https://imgs.search.brave.com/x2y7SrQuxPQSrFV8_igskF1Kn1csh76uqD3vSCLwiGE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi82LzY5L0lN/REJfTG9nb18yMDE2/LnN2Zy8yMjBweC1J/TURCX0xvZ29fMjAx/Ni5zdmcucG5n"
            alt=""
          />
        </a>
      </nav>

      {/* Part-2 Poster and details */}
      <div className="w-full mt-6 sm:mt-8 flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-6 sm:gap-10">
        <img
          src={`https://image.tmdb.org/t/p/original${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
          className="h-[65vh] sm:h-[55vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] object-cover rounded"
        />

        <div className="w-full text-zinc-100 px-2 sm:px-0">
          <h1 className="text-4xl sm:text-6xl font-bold">
            {info.detail.name || info.detail.original_name}
            <span className="text-xl sm:text-3xl text-zinc-200">
              ({info.detail.first_air_date.split("-")[0]})
            </span>
          </h1>
          <div className="w-full mt-5 flex  flex-col sm:flex-row gap-4 sm:gap-10 sm:items-center ">
            <div className="w-full sm:w-fit items-center flex justify-between sm:gap-8 sm:justify-start">
              {info.detail.vote_average && (
                <span className="text-lg bg-yellow-600 flex items-center font-semibold justify-center inline-block h-[7vh] w-[7vh] rounded-full">
                  {(info.detail.vote_average * 10).toFixed()}
                  <sup>%</sup>
                </span>
              )}
              <h1 className="text-2xl w-14 leading-none">User Score</h1>
              <h1 className="text-lg">{info.detail.first_air_date}</h1>
              <span className="w-20"></span>
            </div>

            <h1 className="text-lg">
              {info.detail.genres.map((g) => g.name).join(", ")}
            </h1>
            
          </div>

          <h1 className="mt-2 sm:mt-3 text-2xl italic text-zinc-200 font-semibold">
            {info.detail.tagline}
          </h1>
          <h1 className="mt-1 text-3xl font-semibold">Overview</h1>
          <p>{info.detail.overview}</p>
          <h1 className="mt-1 text-3xl font-semibold">Translated in</h1>
          <p>{info.translations.join(", ")}</p>
          <Link
            to={`${pathname}/trailer`}
            className="px-3 py-2 bg-red-600 rounded-md inline-block mt-3 text-white"
          >
            <i className="ri-play-mini-fill"></i>Watch Trailer
          </Link>
        </div>
      </div>

      {/* Part-3 Available on Platforms */}
      <div className="flex flex-col px-2 sm:px-0 gap-5 mt-5">
        {info.watchProviders && info.watchProviders.flatrate && (
          <div className="flex gap-4 items-center">
            <h1 className="text-lg">Available on Platforms</h1>
            {info.watchProviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.rent && (
          <div className="flex gap-4 items-center">
            <h1 className="text-lg">Available on Rent</h1>
            {info.watchProviders.rent.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
              />
            ))}
          </div>
        )}
        {info.watchProviders && info.watchProviders.buy && (
          <div className="flex gap-4 items-center">
            <h1 className="text-lg">Available to Buy</h1>
            {info.watchProviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Part-4 Recommendations and Similar stuff */}
      <div className="mt-10">
        <h1 className="mb-5 pt-2 text-3xl font-semibold border-t-[0.1vh] border-zinc-400">
          Recommendations and Similar
        </h1>

        <HorizontalCards
          data={info.recommendations ? info.recommendations : info.similar}
        />
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
