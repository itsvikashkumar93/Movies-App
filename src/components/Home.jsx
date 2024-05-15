import React, { useEffect, useState } from "react";
import SideNav from "./Partials/SideNav";
import Search from "./Partials/Search";
import Header from "./Partials/Header";
import axios from "../utils/axios";
import HorizontalCards from "./Partials/HorizontalCards";
import Dropdown from "./Partials/Dropdown";
import Loading from "./Loading";

function Home() {
  document.title = "SCSDB | Home";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      var randomData = Math.floor(Math.random() * data.results.length);

      setWallpaper(data.results[randomData]);
      // console.log(data.results[randomData], randomData);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);

      setTrending(data.results);
      // console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !wallpaper && getHeaderWallpaper();
    getTrending(); // whenever category changes
  }, [category]);

  return wallpaper && trending ? (
    <div className="h-screen w-full sm:flex relative ">
      <div className="sm:w-[20%] absolute sm:relative">{/* <SideNav /> */}</div>
      <div className="h-full sm:w-[80%] overflow-y-auto">
        <div className="searchBox w-full flex items-center justify-center py-5 px-10 ">
          <div className="w-full sm:w-[50%] ">
            <Search />
          </div>
        </div>
        <div className="px-2 sm:px-0 ">
          <Header data={wallpaper} />
        </div>

        <div className=" w-full py-5">
          <div className="w-full flex justify-between px-2 sm:px-5">
            <h1 className="text-3xl sm:text-5xl mb-10 font-semibold text-zinc-400">
              Trending
            </h1>
            <Dropdown
              title={"Filter"}
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <HorizontalCards data={trending} p={1.5} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Home;
