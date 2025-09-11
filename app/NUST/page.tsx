"use client";

import React from "react";
import { nustInfo, univerisities } from "../constants/constant";
import Link from "next/link";
import { useLocalUniSubject } from "../constants/UseLocalUniSubject";

const page = () => {
  const [uniSubject, setUniSubject] = useLocalUniSubject();
  return (
    <>
      <div className="">
        <div className="bg-gradient-to-r  p-3  sm:p-10  from-cyan-700 via-cyan-800 to-cyan-950 mb-0.5 ">
          <div className="justify-evenly flex gap-13 sm:gap-0 flex-col  lg:flex-row">
            <div className=" w-[100%]   lg:w-[40%] flex justify-center items-center">
              <h1 className=" text-4xl sm:text-4xl  font-bold lg:text-4xl 2xl:text-6xl mt-15 sm:mt-0 w-[100%]  xl:w-[75%] ">
                {univerisities[3].name}
              </h1>
            </div>
            <div className="sm:mt-10">
              <img
                className="border-4 border-black rounded-xl w-full lg:w-[95%]"
                src={univerisities[3].img}
                alt="DOW"
              />
            </div>
          </div>

          <div className="border border-gray-200 p-4 my-[10vh] rounded-2xl">
            <h1 className="text-4xl font-bold text-slate-100 text-center mb-4 tracking-wide">
              🎓 Why Choose NUST (National University of Sciences & Technology)?
            </h1>
            <h1 className="text-2xl font-stretch-50%  text-slate-100 mb-4 tracking-tighter">
              NUST is consistently ranked among the top universities in Pakistan
              and Asia, known for its world-class education, research
              facilities, and vibrant campus life. With a wide range of programs
              in engineering, IT, business, social sciences, and medical
              sciences, NUST provides students with an environment that fosters
              innovation, leadership, and global competitiveness. Its
              state-of-the-art infrastructure, highly qualified faculty, and
              strong industry linkages ensure graduates are prepared to excel in
              both local and international markets. NUST also offers diverse
              opportunities for research, exchange programs, and scholarships,
              making it a top choice for ambitious students who want to shape
              the future.
            </h1>
          </div>
        </div>
        {/* test information */}
        {/* purple end */}

        <div className="bg-gradient-to-b sm:p-10 from-cyan-700 via-cyan-950 to-black">
          <div className="border border-gray-200 p-4 sm:my-[10vh] rounded-2xl">
            <div>
              <h1 className="text-4xl font-bold text-slate-100 text-center mb-4 tracking-wide">
                Test Information
              </h1>
              <h1 className="  text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold text-2xl  md:text-3xl">
                  {" "}
                  Total Duration:
                </span>{" "}
                {univerisities[3].time}
              </h1>
              <h1 className="text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold text-2xl  md:text-3xl ">
                  {" "}
                  Question:{" "}
                </span>{" "}
                {univerisities[3].questions}
              </h1>
              <h1 className="text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold text-2xl  md:text-3xl ">
                  {" "}
                  Negative:{" "}
                </span>
                {univerisities[3].negative}
              </h1>
              <h1 className="text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold text-2xl  md:text-3xl ">
                  {" "}
                  Calculator:
                </span>{" "}
                {univerisities[3].calculator}
              </h1>
              <h1 className="text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold  text-2xl  md:text-3xl">
                  {" "}
                  Sections:{" "}
                </span>{" "}
                {univerisities[3].sections}
              </h1>
              <h1 className="text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold  text-2xl  md:text-3xl">
                  {" "}
                  Note:
                </span>{" "}
                {univerisities[3].note}
              </h1>
            </div>
          </div>

          {/* section-wise */}
          <h1 className="text-4xl font-bold text-slate-100 text-center  mt-20 sm:mt-0 mb-4 pb-10 tracking-wide">
            Section-wise breakdown
          </h1>
          <div className="overflow-x-auto">
            <div className="p-4  rounded-2xl">
              <table className="table-auto border-collapse border border-gray-400 w-full text-center min-w-full  ">
                <thead>
                  <tr>
                    <th className="border-2 border-gray-400 sm:px-4 sm:py-2 px-2">
                      Section
                    </th>
                    <th className="border-2 border-gray-400 px-1 sm:px-4 sm:py-2">
                      Questions
                    </th>
                    <th className="border-2 border-gray-400 px-1 sm:px-4 sm:py-2">
                      TIME
                    </th>
                    <th className="border-2 border-gray-400 px-1 sm:px-4 sm:py-2">
                      Weightage
                    </th>
                    <th className="border-2 border-gray-400 px-1 sm:px-4 sm:py-2">
                      Negative
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nustInfo.map((data, i) => (
                    <tr key={i}>
                      <td className="border border-gray-400 px-1 sm:px-4 sm:py-2">
                        {data.name}
                      </td>
                      <td className="border border-gray-400 px-1 sm:px-4 sm:py-2">
                        {data.questions}
                      </td>
                      <td className="border border-gray-400 px-1 sm:px-4 sm:py-2">
                        {data.time}
                      </td>
                      <td className="border border-gray-400 px-1 sm:px-4 sm:py-2">
                        {data.weightage}
                      </td>
                      <td className="border border-gray-400 px-1 sm:px-4 sm:py-2">
                        {data.negative}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center py-20">
            <Link href="/FAST/QUIZ">
              <button
                onClick={() => setUniSubject(3)}
                className="sm:px-20 sm:py-5 px-15 py-4 rounded-3xl border-2 border-cyan-600 text-cyan-600 font-semibold hover:bg-cyan-600 hover:text-white transition duration-300"
              >
                Take the Intellect Trial🧠
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
