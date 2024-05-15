import React, { useEffect, useState } from "react";
import Search from "./Partials/Search";
import Dropdown from "./Partials/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./Partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title = "SCSDB | Trending";
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      // setTrending(data.results);
      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
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
    if (trending.length === 0) {
      getTrending();
    } else {
      // console.log(page);
      setPage(1);
      setTrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-full h-screen text-white ">
      <div className="navbar px-2 py-5 sm:px-10 sm:py-6 w-full flex items-center justify-between">
        <div className="w-[10%] flex items-center gap-2">
          <i
            className="ri-arrow-left-line text-xl hover:text-[#6556CD] cursor-pointer"
            onClick={() => navigate(-1)}
          ></i>
          <h1 className="text-2xl sm:text-3xl font-semibold leading-none">Trending</h1>
        </div>
        <div className="w-[75%] flex items-center justify-end sm:justify-between">
          <div className="w-[50%] hidden sm:block">
            <Search />
          </div>
          <div className="flex gap-3">
            <Dropdown
              title={"Category"}
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
            <div className="hidden sm:block">
              <Dropdown
                title={"Duration"}
                options={["day", "week"]}
                func={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
