import React, { useEffect, useState } from "react";
import Search from "./Partials/Search";
import Dropdown from "./Partials/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./Partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  document.title = "SCSDB | People";
  const navigate = useNavigate();

  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);

      // setPeople(data.results);
      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(people);
  const refreshHandler = () => {
    if (people.length === 0) {
      getTrending();
    } else {
      setPage(1);
      setPeople([]);
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  return people.length > 0 ? (
    <div className="w-full h-screen text-white ">
      <div className="navbar px-2 py-5 sm:px-10 sm:py-6 w-full flex items-center justify-between">
        <div className="w-[10%] flex items-center gap-2">
          <i
            className="ri-arrow-left-line text-xl hover:text-[#6556CD] cursor-pointer"
            onClick={() => navigate(-1)}
          ></i>
          <h1 className="text-2xl sm:text-3xl font-semibold leading-none">People</h1>
        </div>
        <div className="w-[75%] flex items-center justify-between">
        <div className="w-[50%] hidden sm:block">
            <Search />
          </div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading</h1>}
      >
        <Cards data={people} title={"person"} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
