import React from "react";
import notfound from "/404.gif";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <img className="h-[40%] object-cover" src={notfound} alt="" />
    </div>
  );
};

export default NotFound;
