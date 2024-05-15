import React, { useEffect, useState } from "react";
import { asyncloadPerson } from "../store/actions/personActions";
import { useDispatch, useSelector } from "react-redux";
import HorizontalCards from "./Partials/HorizontalCards";
import Dropdown from "./Partials/Dropdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import { removePerson } from "../store/reducers/personSlice";
import Loading from "./Loading";
import noimage from "/noimage.webp";

const PersonDetails = () => {
  const [category, setCategory] = useState("tv");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.person);
  // console.log(info);

  useEffect(() => {
    dispatch(asyncloadPerson(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id]);
  return info ? (
    <div className="relative w-full h-screen text-zinc-100 pt-5 px-1 sm:p-10 sm:px-28 overflow-y-auto ">
      {/* Part-1 Navbar */}
      <nav className="w-full flex gap-5 items-center">
        <i
          className="ri-arrow-left-line text-xl hover:text-[#6556CD] cursor-pointer"
          onClick={() => navigate(-1)}
        ></i>
      </nav>

      {/* Part-2 Poster and details */}
      <div className="w-full mt-4 sm:mt-8 flex flex-col justify-center sm:flex-row sm:items-start sm:justify-start gap-6 sm:gap-10 px-2 sm:px-0">
        <div className="sm:w-[25%] w-full sm:px-2 flex justify-center flex-col items-center">
          <img
            src={
              info.detail.poster_path || info.detail.profile_path
                ? `https://image.tmdb.org/t/p/original${
                    info.detail.poster_path || info.detail.profile_path
                  }`
                : noimage
            }
            alt=""
            className="h-[65vh] sm:h-[55vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] object-cover rounded"
          />
          {/* Part-3 Personal Details */}
          <div className="w-full mt-3 sm:mt-0 text-zinc-100 ">
            {/* Profile Links */}
            <div className="flex gap-3 text-2xl items-center my-1">
              {info.externalId.instagram_id && (
                <a
                  target="_blank"
                  href={`https://www.instagram.com/${info.externalId.instagram_id}`}
                >
                  <i className="ri-instagram-line"></i>
                </a>
              )}
              {info.externalId.facebook_id && (
                <a
                  target="_blank"
                  href={`https://www.facebook.com/${info.externalId.facebook_id}`}
                >
                  <i className="ri-facebook-circle-line"></i>
                </a>
              )}
              {info.externalId.twitter_id && (
                <a
                  target="_blank"
                  href={`https://twitter.com/${info.externalId.twitter_id}`}
                >
                  <i className="ri-twitter-x-line text-xl"></i>
                </a>
              )}
            </div>
            <h1 className="text-2xl mt-2 leading-none">Person Info</h1>
            {info.detail.known_for_department && (
              <>
                <h1 className="text-lg leading-none mt-3 text-zinc-200">
                  Known For
                </h1>
                <p className="text-zinc-300">
                  {info.detail.known_for_department}
                </p>
              </>
            )}
            <h1 className="text-lg leading-none mt-3 text-zinc-200">Gender</h1>
            <p className="text-zinc-300">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </p>

            {info.detail.birthday && (
              <>
                <h1 className="text-lg leading-none mt-3 text-zinc-200">
                  Birth
                </h1>
                <p className="text-zinc-300">{info.detail.birthday}</p>
              </>
            )}

            {info.detail.deathday && (
              <>
                <h1 className="text-lg leading-none mt-3 text-zinc-200">
                  Death
                </h1>
                <p className="text-zinc-300">{info.detail.deathday}</p>
              </>
            )}
            {info.detail.also_known_as.length > 0 && (
              <>
                <h1 className="text-lg leading-none mt-3 text-zinc-200">
                  Also Known As
                </h1>
                <p className="text-zinc-300">
                  {info.detail.also_known_as.join(", ")}
                </p>
              </>
            )}
            {info.detail.place_of_birth && (
              <>
                <h1 className="text-lg leading-none mt-3 text-zinc-200">
                  Place Of Birth
                </h1>
                <p className="text-zinc-300">{info.detail.place_of_birth}</p>
              </>
            )}
          </div>
        </div>
        <div className="text-zinc-200 sm:w-[75%]">
          <h1 className="text-5xl sm:text-6xl text-zinc-100 font-bold">
            {info.detail.name}
          </h1>
          <h1 className="text-3xl font-semibold mt-3">Biography</h1>
          <p className="mt-1">{info.detail.biography}</p>

          <h1 className="text-3xl font-semibold mt-3 mb-5">Known For</h1>

          {/* For Combined Casts */}

          <HorizontalCards data={info.combinedCredits.cast} />

          {/* Part-3 Movie and Tv Credits */}
          <div className="w-full mt-5 bg-[#1F1E24]">
            <div className="flex justify-between">
              <h1 className="text-3xl font-semibold ">Acting</h1>
              <Dropdown
                title={"Category"}
                options={["movie", "tv"]}
                func={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="p-2 w-full flex flex-col gap-2 shadow-[2px_2px_12px_-4px_#5E4EC7] border-[0.2vh] max-h-[40vh] overflow-y-auto border-zinc-600 mt-5 rounded-md">
              {info[category + "Credits"].cast.map((c, i) => (
                <Link
                  to={`/${category}/details/${c.id}`}
                  className="p-2 bg-zinc-900 rounded-md flex flex-col justify-center hover:bg-zinc-800"
                  key={i}
                >
                  <span className="block">
                    {c.title || c.original_title || c.name}
                  </span>
                  {c.character && <span>Character: {c.character}</span>}
                </Link>
              ))}
            </div>
            <div className="h-5 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
