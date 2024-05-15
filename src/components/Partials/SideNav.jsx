import React from "react";
import { Link } from "react-router-dom";

function SideNav() {
  const navData = [
    { icon: "ri-fire-line", title: "Trending", to: "/trending" },
    { icon: "ri-bard-line", title: "Popular", to: "/popular" },
    { icon: "ri-movie-2-line", title: "Movies", to: "/movies" },
    { icon: "ri-tv-line", title: "Tv Shows", to: "/tv" },
    { icon: "ri-team-line", title: "People", to: "/people" },
  ];
  const navData2 = [
    { icon: "ri-information-line", title: "About SCSDB" },
    { icon: "ri-phone-fill", title: "Contact Us" },
  ];
  return (
    <div className="h-screen w-[100%] overflow-hidden border-r-[0.1vw] border-zinc-500 py-8 px-5 bg-[#1F1E24]">
      <h1 className="mt-1 sm:mt-0 text-white text-3xl sm:text-2xl font-bold ">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span>SCSDB</span>
      </h1>

      <nav className="">
        <h1 className="text-white text-2xl sm:text-xl mt-3 mt-2 sm:mt-8 sm:mb-4 font-semibold py-3 ">
          New Feeds
        </h1>
        {navData.map((elem, i) => (
          <Link
            to={elem.to}
            className="text-xl sm:text-lg block text-zinc-300 py-3 mb-2 rounded hover:bg-[#6556CD] hover:text-zinc-100 duration-300"
            key={i}
          >
            <i className={`${elem.icon} mr-2`}></i>
            {elem.title}
          </Link>
        ))}
      </nav>

      <hr className="my-5 border-zinc-500" />
      <nav className="">
        <h1 className="text-white text-2xl sm:text-xl sm:mb-4 font-semibold py-3">
          Website Information
        </h1>
        {navData2.map((elem, i) => (
          <Link
            className="text-xl sm:text-lg block text-zinc-300 py-3 sm:mb-2 rounded hover:bg-[#6556CD] hover:text-zinc-100 duration-300"
            key={i}
          >
            <i className={`${elem.icon} mr-2`}></i>
            {elem.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default SideNav;
