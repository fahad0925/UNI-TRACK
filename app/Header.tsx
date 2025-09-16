import React from "react";
import { LiaUniversitySolid } from "react-icons/lia";

const hero = () => {
  return (
    <div className="flex w-full h-[8vh] sm:pl-20 pl-4 items-center bg-gradient-to-r from-cyan-900 via-cyan-950 to-cyan-950 text-gray-300">
      <LiaUniversitySolid className="drop-shadow-[0_0_30px_white] h-10 w-13  md:h-15 md:w-18" />
      <h1 className=" text-3xl md:text-5xl drop-shadow-[0_0_30px_white]">
        UNI-TRACK
      </h1>
    </div>
  );
};

export default hero;
