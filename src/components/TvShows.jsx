import React, { useEffect, useState } from "react";
import Search from "./Partials/Search";
import Dropdown from "./Partials/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./Partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const TvShows = () => {
  document.title = "SCSDB | Tv Shows";
  const navigate = useNavigate();

  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      // setTv(data.results);
      if (data.results.length > 0) {
        setTv((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      getTv();
    } else {
      setPage(1);
      setTv([]);
      getTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-full h-screen text-white ">
      <div className="navbar px-2 py-5 sm:px-10 sm:py-6 w-full flex items-center justify-between">
        <div className="w-[20%] flex items-center gap-2">
          <i
            className="ri-arrow-left-line text-xl hover:text-[#6556CD] cursor-pointer"
            onClick={() => navigate(-1)}
          ></i>
          <h1 className="text-2xl sm:text-3xl font-semibold leading-none flex items-center gap-2">
            Tv Shows <span className="text-sm">({category})</span>{" "}
          </h1>
        </div>
        <div className="w-[75%] flex items-center justify-end sm:justify-between">
          <div className="w-[50%] hidden sm:block">
            <Search />
          </div>
          <div className="flex gap-3">
            <Dropdown
              title={"Category"}
              options={["on_the_air", "popular", "top_rated", "airing_today"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={getTv}
        hasMore={hasMore}
        loader={<h1>Loading</h1>}
      >
        <Cards data={tv} title={"tv"} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
