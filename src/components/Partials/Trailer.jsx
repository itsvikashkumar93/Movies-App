import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  //   console.log(pathname.includes('movie'), pathname);
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  console.log(ytvideo);

  return (
    <div className="absolute top-0 left-0 z-[1000] overflow-hidden w-full h-screen bg-[rgba(0,0,0,.9)] flex items-center justify-center">
      <Link
        to={navigate(-1)}
        className="ri-close-fill absolute right-[12%] top-[8%] text-3xl hover:text-[#6556CD] cursor-pointer"
      ></Link>
      {ytvideo ? (
        <ReactPlayer
          controls={true}
          height={600}
          width={1000}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
