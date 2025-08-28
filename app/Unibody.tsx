import React from "react";
import { univerisities } from "./constants/constant";
import Link from "next/link";

const mainPage = () => {
  return (
    <div className=" px-5  md:px-20">
      <div className="">
        <h1 className="text-xl text-center font-semibold text-gray-100 mt-5">
          Discover universities of Pakistan in one place. Explore admission
          details, available programs, fee structures, scholarships, and even
          test your knowledge to prepare for the future.
        </h1>
      </div>

      <div className="flex justify-center">
        <h1 className="text-md w-[70%] text-center font-semibold text-gray-100 mt-5">
          Choosing the right university is one of the most important steps in
          shaping your career. With countless options across Pakistan, students
          often find it difficult to compare admission requirements, test
          patterns, fee structures, and programs. That’s why we bring everything
          together in one place — helping you explore top institutions,
          understand their unique strengths, and prepare confidently for the
          future. Whether your dream is engineering, medicine, or computer
          science, this platform guides you towards making the best choice.
        </h1>
      </div>

      <div className="">
        <h1 className="text-xl  font-semibold text-gray-100 mt-5">
          Your Pathway to Success
        </h1>
      </div>
      <div className="gap-10  py-10 grid grid-col-1  md:grid-cols-2 lg:grid-cols-3   2xl:grid-cols-4 justify-center">
        {univerisities.map((data, i) => (
          <div
            key={i}
            className=" w-90 h-auto  bg-grey-100 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl  text-white hover:scale-105 transform transition duration-300 "
          >
            <img
              className="w-full h-50 object-cover rounded-xl mb-4"
              src={data.img}
              alt="hello world"
            />
            <div className="p-3 h-auto ">
              <h1 className="text-xl font-bold mb-2 text-white">{data.name}</h1>
              <h1 className="text-sm font-bold mb-2 text-gray-300">
                {data.text}
              </h1>
              <div className="">
                <Link href={data.route}>
                  <button className="rounded-xl text-white px-4 py-2 font-medium bg-white/10 backdrop-blur-sm border border-white/70 hover:bg-white/20 transition">
                    More Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default mainPage;
