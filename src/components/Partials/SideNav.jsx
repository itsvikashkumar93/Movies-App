import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navData = [
    { icon: "ri-fire-line", title: "Trending", to: "/trending" },
    { icon: "ri-bard-line", title: "Popular", to: "/popular" },
    { icon: "ri-movie-2-line", title: "Movies", to: "/movies" },
    { icon: "ri-tv-line", title: "Tv Shows", to:"/tv" },
    { icon: "ri-team-line", title: "People", to:"/people" },
  ];
  const navData2 = [
    { icon: "ri-information-line", title: "About SCSDB" },
    { icon: "ri-phone-fill", title: "Contact Us" },
  ];
  return (
    <div className="h-full w-[20%] border-r-[0.1vw] border-zinc-500 py-8 px-4">
      <h1 className="text-white text-2xl font-bold px-2">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span>SCSDB</span>
      </h1>

      <nav className="">
        <h1 className="text-white text-xl mt-8 mb-4 font-semibold py-3 px-3 ">
          New Feeds
        </h1>
        {navData.map((elem, i) => (
          <Link
            to={elem.to}
            className="text-lg block text-zinc-300 py-3 px-3 mb-2 rounded hover:bg-[#6556CD] hover:text-zinc-100 duration-300"
            key={i}
          >
            <i className={`${elem.icon} mr-2`}></i>
            {elem.title}
          </Link>
        ))}
      </nav>

      <hr className="my-5 border-zinc-500" />
      <nav className="">
        <h1 className="text-white text-xl  mb-4 font-semibold py-3 px-3 ">
          Website Information
        </h1>
        {navData2.map((elem, i) => (
          <Link
            className="text-lg block text-zinc-300 py-3 px-3 mb-2 rounded hover:bg-[#6556CD] hover:text-zinc-100 duration-300"
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

export default Navbar;
