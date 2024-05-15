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
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const handleSidebar = () => {
    document.querySelector(".sidebar").classList.toggle("hidden");

    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    !wallpaper && getHeaderWallpaper();
    getTrending(); // whenever category changes
  }, [category]);

  return wallpaper && trending ? (
    <div className="h-screen w-full sm:flex relative ">
      <div className="sidebar sm:w-[20%] absolute z-[999] sm:relative hidden sm:block">
        <SideNav />
      </div>
      <div className="h-full w-full sm:w-[80%] overflow-y-auto">
        <div className="searchBox relative w-full sm:flex sm:items-center sm:justify-center py-5 px-3 sm:px-10 ">
          <div
            onClick={() => handleSidebar()}
            className="text-white flex items-center justify-between text-xl sm:hidden py-2 mt-4 bg-zinc-800 px-3 rounded"
          >
            <h1 className="text-zinc-300">Menu</h1>
            {sidebarOpen ? (
              <i className="ri-menu-2-line text-zinc-200"></i>
            ) : (
              <i className="ri-close-large-line text-zinc-200"></i>
            )}
          </div>
          <div className="flex justify-center">
            <div className="w-[100%] pt-4 sm:w-[50%] ">
              <Search />
            </div>
          </div>
        </div>
        <div className="px-2 sm:px-0 ">
          <Header data={wallpaper} />
        </div>

        <div className=" w-full py-5">
          <div className="w-full flex justify-between px-2 sm:px-5">
            <h1 className="text-4xl sm:text-5xl mb-10 font-semibold text-zinc-400">
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
