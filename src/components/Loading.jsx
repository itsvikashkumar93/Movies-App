import React from "react";
import loader from "/loader.gif";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <img className="sm:h-[40%] h-[30%] object-cover" src={loader} alt="" />
    </div>
  );
};

export default Loading;
